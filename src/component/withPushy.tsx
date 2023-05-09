import { useEffect, useState } from "react";
import {
  UpdateAvailableResult,
  checkUpdate,
  downloadUpdate,
  isFirstTime,
  isRolledBack,
  markSuccess,
  switchVersion,
  switchVersionLater,
} from "react-native-update";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
type IReactComponent =
  | React.FunctionComponent
  | React.ClassicComponentClass
  | React.ComponentClass
  | React.ForwardRefExoticComponent<any>;

export const withPushy = <T extends IReactComponent>(
  OriginComponent: T,
  appKey: string
): T => {
  const HOCValue = (props: any) => {
    useEffect(() => {
      cacheUpdate();

      if (isFirstTime) {
        // 必须调用此更新成功标记方法
        // 否则默认更新失败，下一次启动会自动回滚
        markSuccess();
        Toast.show({
          type: "success",
          text1: "更新完成",
        });
      } else if (isRolledBack) {
        Toast.show({
          type: "error",
          text1: "刚刚更新失败了,版本被回滚.",
        });
      }
    }, []);

    const [visible, setVisible] = useState(false);
    const [info, setInfo] = useState<UpdateAvailableResult>();
    const [download, setDownload] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const [progress, setProgress] = useState({
      received: 0,
      total: 0,
    });
    const [hash, setHash] = useState("");

    //当进度条满的时候,设置下载成功
    useEffect(() => {
      if (progress.received >= progress.total && progress.total !== 0) {
        setDownloading(false);
        setDownload(true);
      }
    }, [progress]);

    const cacheUpdate = async () => {
      const info = await checkUpdate(appKey) as UpdateAvailableResult
      
      if (info.update) {
        //如果需要更新才显示弹窗
        setVisible(true);
        setInfo(info);
        try {
          //设置下载中
          setDownloading(true);
          const hash = await downloadUpdate(info, {
            onDownloadProgress: ({ received, total }) => {
              setProgress({ received, total });
            },
          });
          if (hash) {
            setHash(hash);
          }
        } catch (error) {
          Toast.show({
            type: "error",
            text1: JSON.stringify(error),
          });
        }
      }
    };

    const onLaterHandle = () => {
      if (hash) {
        switchVersionLater(hash);
      }
      setVisible(false);
    };

    const onImmediatelyHandle = () => {
      if (hash) {
        switchVersion(hash);
      }
      setVisible(false);
    };

    return (
      <>
        <OriginComponent {...props}></OriginComponent>
        <Modal
          animationType="fade"
          visible={visible}
          statusBarTranslucent
          transparent
        >
          <View style={styles.root}>
            <View style={styles.container}>
              <Text style={styles.title}>检查到有可更新补丁~</Text>
              <View style={styles.txtItem}>
                <Text style={styles.text}>名称:</Text>
                <Text style={styles.text2}>{info?.name}</Text>
              </View>
              <View style={styles.txtItem}>
                <Text style={styles.text}>描述:</Text>
                <Text style={styles.text2}>{info?.description}</Text>
              </View>
              {downloading && download == false && (
                <View
                  style={{
                    paddingHorizontal: 20,
                  }}
                >
                  <Text style={{
										width:'100%',
										textAlign:'center',
										color:'#333',
										fontSize:12,
										fontWeight:'bold'
									}}>下载进度:&nbsp;{(progress.received/progress.total*100).toFixed(2)}%</Text>
                </View>
              )}

              {download && downloading == false && (
                <View style={styles.buttonView}>
                  <TouchableOpacity
                    onPress={onLaterHandle}
                    style={[
                      styles.buttonItem,
                      {
                        backgroundColor: "#34d",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: "white",
                      }}
                    >
                      下次启动更新
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onImmediatelyHandle}
                    style={[
                      styles.buttonItem,
                      {
                        backgroundColor: "#ff2442",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: "white",
                      }}
                    >
                      立即重启更新
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </>
    );
  };

  return HOCValue as T;
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#00000090",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  container: {
    width: "70%",
    height: 200,
    backgroundColor: "white",
    borderRadius: 18,
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 36,
    textAlignVertical: "center",
    color: "white",
    backgroundColor: "#ff2442",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },
  txtItem: {
    flexDirection: "row",
    paddingHorizontal: 12,
    alignItems: "center",
    marginBottom: 12,
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  text: {
    marginRight: 10,
    fontSize: 14,
    color: "#999",
  },
  text2: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  total: {
    width: "100%",
    height: 20,
    backgroundColor: "#eee",
  },
  received: {
    height: "100%",
    backgroundColor: "#ff2442",
    width: "0%",
  },
  buttonView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 16,
  },
  buttonItem: {
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
});
