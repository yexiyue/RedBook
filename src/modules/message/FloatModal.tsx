import {
  PropsWithChildren,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import icon_group from "../../assets/icon_group.png";
import icon_create from "../../assets/icon_create_group.png";

export type FloatModalRef = {
  show: (y:number) => void;
  hide: () => void;
};

export const FloatModal = forwardRef<FloatModalRef>((props, ref) => {
  const [isVisible, setVisible] = useState(false);
	const [position,setPosition]=useState(100)
  useImperativeHandle(ref, () => ({
    show: (y) => {
			setVisible(true)
			console.log(y)
			setPosition(y)
		},
    hide: () => setVisible(false),
  }));

  const renderContent = () => {
    const styles = StyleSheet.create({
      root: {
        backgroundColor: "white",
        borderRadius: 16,
        position: "absolute",
        right: 16,
        top: position+50,
        paddingHorizontal: 20,
      },
      image: {
        width: 25,
        height: 25,
      },
      item: {
        flexDirection: "row",
        height: 48,
        alignItems: "center",
      },
      txt: {
        fontSize: 16,
        color: "#333",
        marginLeft: 10,
      },
    });
    return (
      <View style={styles.root}>
        <Pressable style={styles.item}>
          <Image style={styles.image} source={icon_group} />
          <Text style={styles.txt}>群聊广场</Text>
        </Pressable>
        <View
          style={{
            width: "100%",
            height: StyleSheet.hairlineWidth,
            backgroundColor: "#ccc",
          }}
        ></View>
        <Pressable style={styles.item}>
          <Image style={styles.image} source={icon_create} />
          <Text style={styles.txt}>创建群聊</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <Modal
      onRequestClose={() => {
        setVisible(false);
      }}
      visible={isVisible}
      statusBarTranslucent
      transparent
    >
      <Pressable onPress={() => setVisible(false)} style={styles.root}>
        {renderContent()}
      </Pressable>
    </Modal>
  );
});

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#00000050",
    flex: 1,
  },
});
