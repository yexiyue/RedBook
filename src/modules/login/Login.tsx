import {
  Image,
  LayoutAnimation,
  Linking,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import welcomeImage from "../../assets/icon_main_logo.png";
import { useMemo, useState } from "react";
import icon_unselected from "../../assets/icon_unselected.png";
import icon_selected from "../../assets/icon_selected.png";
import icon_arrow from "../../assets/icon_arrow.png";
import icon_wx from "../../assets/icon_wx_small.png";
import icon_triangle from "../../assets/icon_triangle.png";
import icon_eye_open from "../../assets/icon_eye_open.png";
import icon_eye_close from "../../assets/icon_eye_close.png";
import icon_exchange from "../../assets/icon_exchange.png";
import icon_wx_big from "../../assets/icon_wx.png";
import icon_qq from "../../assets/icon_qq.webp";
import icon_close_modal from "../../assets/icon_close_modal.png";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { parsePhone, replacePhone } from "../../utils/stringUtil";
import { request } from "../../utils/request";
import { useUserStore } from "../../stores/UserStore";
import  Toast  from "react-native-toast-message";

export const Login = () => {
  //登录类型
  const [loginType, setLoginType] = useState<"quick" | "input">("quick");

  //同意协议
  const [check, setCheck] = useState(false);

 
  const navigator=useNavigation<StackNavigationProp<any>>()

  const renderQuickLogin = () => {
    const styles = StyleSheet.create({
      root: {
        backgroundColor: "white",
        flexDirection: "column-reverse",
        height: "100%",
        paddingHorizontal: 56,
        width: "100%",
        alignItems: "center",
      },
      img: {
        resizeMode: "contain",
        width: 150,
        height: 80,
        marginTop: 150,
      },
      protocolLayout: {
        width: "100%",
        marginBottom: 32,
        flexDirection: "row",
      },
      radioButton: {
        width: 20,
        height: 20,
      },
      labelText: {
        fontSize: 12,
        color: "#999",
        textAlignVertical: "center",
        marginLeft: 6,
      },
      protocolTxt: {
        fontSize: 12,
        color: "#374466",
        textAlignVertical: "center",
      },
      otherLoginButton: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 100,
        //添加padding方便点击
        paddingHorizontal: 20,
        paddingVertical: 10,
      },
      otherImg: {
        height: 16,
        width: 16,
        marginLeft: 6,
        transform: [
          {
            rotate: "180deg",
          },
        ],
      },
      otherTxt: {
        fontSize: 14,
        color: "#303030",
      },
      wxLoginButton: {
        width: 280,
        flexDirection: "row",
        backgroundColor: "#05c160",
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
      },
      wxImg: {
        width: 32,
        height: 32,
      },
      wxTxt: {
        color: "white",
        fontSize: 16,
        marginLeft: 6,
      },
      redColor: {
        backgroundColor: "#ff2442",
      },
      welcomeImg: {
        width: 180,
        height: 95,
        resizeMode: "contain",
        position: "absolute",
        top: 180,
      },
    });
    return (
      <View style={styles.root}>
        {/* 底部协议 */}
        <View style={styles.protocolLayout}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setCheck((preValue) => !preValue);
            }}
          >
            <Image
              style={styles.radioButton}
              source={check ? icon_selected : icon_unselected}
            ></Image>
          </TouchableOpacity>
          <Text style={styles.labelText}>我已经阅读并同意</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://www.baidu.com");
            }}
          >
            <Text style={styles.protocolTxt}>《用户协议》和《隐私政策》</Text>
          </TouchableOpacity>
        </View>
        {/* 其他登录按钮 */}
        <TouchableOpacity
          onPress={() => {
            LayoutAnimation.easeInEaseOut()
            setLoginType((preValue) => {
              if (preValue === "quick") return "input";
              return "quick";
            });
          }}
        >
          <View style={styles.otherLoginButton}>
            <Text style={styles.otherTxt}>其他登录方式</Text>
            <Image style={styles.otherImg} source={icon_arrow}></Image>
          </View>
        </TouchableOpacity>
        {/* 微信登录 */}
        <TouchableOpacity style={styles.wxLoginButton} activeOpacity={0.7}>
          <Image style={styles.wxImg} source={icon_wx}></Image>
          <Text style={styles.wxTxt}>微信登录</Text>
        </TouchableOpacity>
        {/* 一键登录 */}
        <TouchableOpacity
          style={[styles.wxLoginButton, styles.redColor]}
          activeOpacity={0.7}
        >
          <Text style={styles.wxTxt}>一键登录</Text>
        </TouchableOpacity>

        {/* 小红书标识 */}
        <Image source={welcomeImage} style={styles.welcomeImg}></Image>
      </View>
    );
  };
   //展示密码
  const [showPassword, setShowPassword] = useState(false);
  const [pwd,setPwd]=useState('')
  const [phoneNumber,setPhoneNumber]=useState('')

  const [userInfo,requestLogin]=useUserStore((state)=>[state.userInfo,state.requestLogin])
  
  const renderInputLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        flexDirection: "column",
        paddingHorizontal: 56,
        backgroundColor: "white",
      },
      pwdLogin: {
        fontSize: 28,
        color: "#333",
        fontWeight: "bold",
        marginTop: 56,
      },
      tip: {
        color: "#E6E6E6",
        marginTop: 10,
      },
      phoneLayout: {
        width: "100%",
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        marginTop: 20,
      },
      pre86: {
        fontSize: 24,
        color: "#999",
      },
      triangle: {
        width: 12,
        height: 7,
        marginLeft: 4,
      },
      input: {
        flex: 1,
        textAlign: "left",
        textAlignVertical: "center",
        fontSize: 24,
        color: "#333",
        backgroundColor: "transparent",
        marginLeft: 6,
      },
      pwdLayout: {
        width: "100%",
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        marginTop: 10,
      },
      pwdShowImg: {
        width: 24,
        height: 24,
        resizeMode: "contain",
      },
      changeLayout: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        height: 64,
        alignItems: "center",
      },
      changeImg: {
        width: 24,
        height: 24,
      },
      changeImgBox: {
        flexDirection: "row",
      },
      changeTxt: {
        color: "#314B70",
        fontSize: 16,
      },
      loginButton: {
        width: "100%",
        height: 56,
        backgroundColor: "#ff2442",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 28,
      },
      loginButtonDisable:{
        backgroundColor:'#ddd'
      },
      loginTxt: {
        color: "white",
        width: "100%",
        textAlign: "center",
        fontSize: 18,
      },
      //拷贝的样式
      protocolLayout: {
        marginTop: 24,
        width: "100%",
        marginBottom: 32,
        flexDirection: "row",
      },
      radioButton: {
        width: 20,
        height: 20,
      },
      labelText: {
        fontSize: 12,
        color: "#999",
        textAlignVertical: "center",
        marginLeft: 6,
      },
      protocolTxt: {
        fontSize: 12,
        color: "#374466",
        textAlignVertical: "center",
      },
      icon_img: {
        width: 50,
        height: 50,
      },
      iconContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
      },
      closeButton: {
        position: "absolute",
        top: 24,
        left: 36,
      },
      closeImg: {
        width: 28,
        height: 28,
      },
    });

    const loginHandle=async ()=>{
      const purePhone=replacePhone(phoneNumber)
      const data=await requestLogin(purePhone,pwd)
      if(data){
        navigator.replace('mainTab')
      }else{
        navigator.replace('mainTab')
        Toast.show({
          type:'error',
          text1:'账号或者密码错误',
        })
      }
      
    }
    const canLogin=phoneNumber.length===13 && pwd.length!=0 && check
    return (
      <View style={styles.root}>
        <Text style={styles.pwdLogin}>密码登录</Text>
        <Text style={styles.tip}>未注册的手机号登录成功后将自动注册</Text>
        {/* 账号框 */}
        <View style={styles.phoneLayout}>
          <Text style={styles.pre86}>+86</Text>
          <Image style={styles.triangle} source={icon_triangle} />
          <TextInput
            keyboardType="number-pad"
            maxLength={13}
            placeholder="请输入手机号码"
            placeholderTextColor="#CFCFCF"
            style={styles.input}
            value={phoneNumber}
            onChangeText={(text)=>setPhoneNumber(parsePhone(text))}
            
          />
        </View>
        {/* 密码框 */}
        <View style={styles.pwdLayout}>
          <TextInput
            placeholder="密码"
            placeholderTextColor="#CFCFCF"
            secureTextEntry={showPassword}
            style={styles.input}
            value={pwd}
            onChangeText={(text)=>setPwd(text)}
          />
          <TouchableOpacity
            onPress={() => {
              setShowPassword((preValue) => !preValue);
            }}
          >
            <Image
              style={styles.pwdShowImg}
              source={showPassword ? icon_eye_close : icon_eye_open}
            />
          </TouchableOpacity>
        </View>

        {/* 切换验证码登录 */}
        <View style={styles.changeLayout}>
          <TouchableOpacity style={styles.changeImgBox}>
            <Image style={styles.changeImg} source={icon_exchange}></Image>
            <Text style={styles.changeTxt}>验证码登录</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.changeTxt}>忘记密码?</Text>
          </TouchableOpacity>
        </View>

        {/* 登录按钮 */}
        <TouchableOpacity activeOpacity={0.7} 
          onPress={loginHandle}
          disabled={!canLogin}
        >
          <View style={[styles.loginButton,!canLogin?styles.loginButtonDisable:null]}>
            <Text style={styles.loginTxt}>登录</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.protocolLayout}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setCheck((preValue) => !preValue);
            }}
          >
            <Image
              style={styles.radioButton}
              source={check ? icon_selected : icon_unselected}
            ></Image>
          </TouchableOpacity>
          <Text style={styles.labelText}>我已经阅读并同意</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://www.baidu.com");
            }}
          >
            <Text style={styles.protocolTxt}>《用户协议》和《隐私政策》</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <Image style={styles.icon_img} source={icon_wx_big}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.icon_img} source={icon_qq}></Image>
          </TouchableOpacity>
        </View>
        
        {/* 解决绝对定位问题，最好是在TouchableOpacity外面包一层view */}
        <View style={styles.closeButton}>
          {/* TouchableOpacity最好不要拿来布局 */}
          <TouchableOpacity
            onPress={() => {
              LayoutAnimation.easeInEaseOut();
              setLoginType("quick");
            }}
          >
            <Image style={styles.closeImg} source={icon_close_modal} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return <>{loginType === "quick" ? renderQuickLogin() : renderInputLogin()}</>;
};
