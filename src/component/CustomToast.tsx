import Toast from "react-native-toast-message";
import { ToastConfig } from "react-native-toast-message";
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  View,
} from "react-native";
import icon_loading from "../assets/loading.png";
import { useRef } from "react";
const { height } = Dimensions.get("screen");

export const CustomToast = () => {
  const rotate = useRef(new Animated.Value(0)).current;
  const rotateValue = rotate.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "18000deg"],
  });

  const animate = Animated.timing(rotate, {
    useNativeDriver: false,
    toValue: 360,
    duration: 60000,
    easing: Easing.linear,
  });

  const toastConfig: ToastConfig = {
    //自定义提示ui
    loading: ({ text1 = "加载中..." }) => {
      return (
        <View style={styles.loading}>
          {/* 给图片添加旋转动画 */}
          <Animated.Image
            style={[
              styles.loadingImage,
              {
                transform: [
                  {
                    rotate: rotateValue,
                  },
                ],
              },
            ]}
            source={icon_loading}
          ></Animated.Image>
          <Text style={styles.loadingTxt}>{text1}</Text>
        </View>
      );
    },
  };
  return (
    <Toast
      onShow={() => animate.start()}
      onHide={() => {
        animate.stop();
        animate.reset();
      }}
      config={toastConfig}
      topOffset={height / 2 - 75}
    ></Toast>
  );
};

const styles = StyleSheet.create({
  loading: {
    width: 100,
    height: 100,
    backgroundColor: "#00000070",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  loadingTxt: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  loadingImage: {
    width: 40,
    height: 40,
  },
});
