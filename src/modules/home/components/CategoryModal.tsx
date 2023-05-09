import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  Button,
  Dimensions,
  Image,
  LayoutAnimation,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import icon_arrow from "../../../assets/icon_arrow.png";
import icon_delete from "../../../assets/icon_delete.png";
import { useHomeStore } from "../useHomeStore";

export type CategoryModalRef = {
  show: () => void;
  hide: () => void;
};

type Props = {
  
};

const { width } = Dimensions.get("screen");
export const CategoryModal = forwardRef<CategoryModalRef, Props>(
  (props, ref) => {

    const [categoryList,setCategoryList] = useHomeStore(state=>[state.categoryList,state.setCategoryList])
		
    const [myList, otherList] = useMemo(
      () => [
        categoryList.filter((item) => item.isAdd),
        categoryList.filter((item) => !item.isAdd),
      ],
      [categoryList]
    );

    const [visible, setVisible] = useState(false);
    const [edit, setEdit] = useState(false);

    //暴露方法给ref
    useImperativeHandle(ref, () => ({
      show: () => setVisible(true),
      hide: () => {
				setVisible(false)
				setEdit(false)
			},
    }));

    const hideHandle = () => {
      setVisible(false);
			setEdit(false)
    };

    const onMyItemPress = useCallback(
      (item: Category) => () => {
        /* 因为这里是闭包依赖了外面的值，所以需要作为依赖项 */
        if (!edit) return;
        if(item.default)return
				item.isAdd=false
        LayoutAnimation.easeInEaseOut()
        setCategoryList({...item})
      },
      [edit]
    );

    const onOtherItemPress = useCallback(
      (item: Category) => () => {
        item.isAdd=true
        LayoutAnimation.easeInEaseOut()
        setCategoryList({...item})
      },
      []
    );

    const renderMyList = () => {
      return (
        <>
          <View style={styles.row}>
            <Text style={styles.titleTxt}>我的频道</Text>
            <Text style={styles.subTitleTxt}>
              {edit ? "长按拖动排序" : "点击进入频道"}
            </Text>
            <Pressable
              onPress={() => {
                setEdit((preValue) => !preValue);
              }}
              style={styles.editButton}
            >
              <Text style={styles.editTxt}>
                {edit ? "完成编辑" : "进入编辑"}
              </Text>
            </Pressable>
            <Pressable style={styles.closeButton} onPress={hideHandle}>
              <Image style={styles.closeImage} source={icon_arrow}></Image>
            </Pressable>
          </View>
          <View style={styles.listContent}>
            {myList.map((item) => (
              <Pressable
                onPress={onMyItemPress(item)}
                style={[styles.itemLayout,item.default && {
									backgroundColor:'#ddd'
								}]}
                key={item.name}
              >
                <Text style={styles.itemTxt}>{item.name}</Text>
                {edit && !item.default && (
									/* 这里可以直接使用Image进行定位 */
									/* Pressable比TouchableOpacity更适合包装按钮，但是没有渐变反馈 */
									/* 推荐使用Pressable来自定义按钮 */
                  <Pressable style={styles.deleteButton}>
                    <Image
                      style={styles.icon_delete}
                      source={icon_delete}
                    ></Image>
                  </Pressable>
                )}
              </Pressable>
            ))}
          </View>
        </>
      );
    };

    const renderOtherList = () => {
      return (
        <>
          <View
            style={[
              styles.row,
              {
                marginTop: 32,
                marginBottom: 10,
              },
            ]}
          >
            <Text style={styles.titleTxt}>推荐频道</Text>
            <Text style={styles.subTitleTxt}>点击添加频道</Text>
          </View>
          <View style={styles.listContent}>
            {otherList.map((item) => (
              <Pressable
                onPress={onOtherItemPress(item)}
                style={styles.itemLayout}
                key={item.name}
              >
                <Text style={styles.itemTxt}>+ {item.name}</Text>
              </Pressable>
            ))}
          </View>
        </>
      );
    };
    return (
      <Modal
        visible={visible}
        transparent
        statusBarTranslucent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.categoryModal}>
          <View style={styles.content}>
            {renderMyList()}
            {renderOtherList()}
          </View>
          <View style={styles.mask}></View>
        </View>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  categoryModal: {
    width: "100%",
    height: "100%",
  },
  content: {
    backgroundColor: "white",
    marginTop: 48 + (StatusBar.currentHeight || 0),
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  mask: {
    flex: 1,
    backgroundColor: "#00000060",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleTxt: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  subTitleTxt: {
    color: "#999",
    fontSize: 13,
    marginLeft: 12,
    flex: 1,
  },
  editButton: {
    paddingHorizontal: 14,
    height: 28,
    backgroundColor: "#EEE",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  editTxt: {
    fontSize: 13,
    color: "#3050ff",
  },
  closeButton: {
    padding: 12,
  },
  closeImage: {
    width: 20,
    height: 20,
    transform: [
      {
        rotate: "90deg",
      },
    ],
  },
  listContent: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  itemLayout: {
    width: (width - 80) / 4,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 6,
    marginTop: 10,
    marginLeft:12
  },
  itemTxt: {
    fontSize: 14,
    color: "#666",
  },
  icon_delete: {
    width: 15,
    height: 15,
    resizeMode: "cover",
  },
  deleteButton: {
    position: "absolute",
    right: -5,
    top: -5,
  },
});
