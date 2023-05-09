import {
  Animated,
  Dimensions,
  Easing,
  Image,
  NativeScrollEvent,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from "react-native";
import icon_mine_bg from "../../assets/icon_mine_bg.png";
import icon_menu from "../../assets/icon_menu.png";
import icon_shop_car from "../../assets/icon_shop_car.png";
import icon_share from "../../assets/icon_share.png";
import icon_location_info from "../../assets/icon_location_info.png";
import icon_qrcode from "../../assets/icon_qrcode.png";
import icon_add from "../../assets/icon_add.png";
import icon_male from "../../assets/icon_male.png";
import icon_female from "../../assets/icon_female.png";
import icon_setting from "../../assets/icon_setting.png";

import { useUserStore } from "../../stores/UserStore";
import { useEffect, useMemo, useRef, useState } from "react";
import { RefreshControl, TouchableOpacity } from "react-native-gesture-handler";
import { request } from "../../utils/request";
import { MineList } from "./MineList";
import { SlideMenu, SlideMenuRef } from "./SideMenu";



export const Mine = () => {
  const userInfo = useUserStore((state) => state.userInfo);

  const topValue = useRef(new Animated.Value(35,{
    useNativeDriver:true
  })).current;

  const animate = useMemo(
    () =>
      Animated.timing(topValue, {
        useNativeDriver: true,
        toValue: 0,
        duration: 500,
        easing: Easing.bezier(0.83, 0, 0.17, 1),
      }),
    []
  );

  const animate2 = useMemo(
    () =>
      Animated.timing(topValue, {
        useNativeDriver: true,
        toValue: 35,
        duration: 500,
        easing: Easing.bezier(0.83, 0, 0.17, 1),
      }),
    []
  );

  const slideMenuRef=useRef<SlideMenuRef>(null)

  const renderTitle = () => {
    const styles = StyleSheet.create({
      titleLayout: {
        height: 40,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        overflow: "hidden",
        marginTop: 20,
      },
      image: {
        width: 20,
        height: 20,
        resizeMode: "cover",
        tintColor: "white",
      },
      avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
      },
    });
    return (
      <View style={styles.titleLayout}>
        <Pressable onPress={()=>slideMenuRef.current?.show()} hitSlop={10}>
          <Image style={styles.image} source={icon_menu} />
        </Pressable>
        <Animated.View
          style={{
            transform:[{
              translateY:topValue,
            }]
          }}
        >
          <Image style={styles.avatar} source={{ uri: userInfo?.avatar }} />
        </Animated.View>
        <Pressable hitSlop={10}>
          <Image style={styles.image} source={icon_share} />
        </Pressable>
      </View>
    );
  };

  const [countInfo, setCountInfo] = useState<CountInfo>();
  useEffect(() => {
    request("accountInfo").then((res) => {
      setCountInfo(res.data);
    });
  }, []);

  const [height, setHeight] = useState(400);

  const renderInfo = () => {
    const styles = StyleSheet.create({
      avatarLayout: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 16,
      },
      avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        resizeMode: "cover",
      },
      icon_add: {
        position: "absolute",
        width: 20,
        height: 20,
        bottom: 15,
        left: 70,
      },
      nameTxt: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
      },
      nickNameTxt: {
        fontSize: 12,
        color: "#bbb",
        marginTop: 16,
      },
      nameContainer: {
        marginLeft: 16,
      },
      qrcode: {
        width: 12,
        height: 12,
        tintColor: "#bbb",
      },
      desc: {
        marginHorizontal: 16,
        color: "white",
        fontSize: 14,
      },
      female: {
        width: 8,
        height: 12,
        resizeMode: "contain",
      },
      femaleBox: {
        backgroundColor: "#ffffff50",
        width: 32,
        paddingVertical: 4,
        alignItems: "center",
        borderRadius: 12,
        marginLeft: 16,
        marginTop: 12,
      },
      infoLayout: {
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
      },
      infoItem: {
        marginRight: 16,
      },
      infoValue: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
      },
      infoLabel: {
        color: "#bbb",
        marginTop: 4,
        fontSize: 12,
      },
      button: {
        paddingHorizontal: 12,
        backgroundColor: "#ffffff20",
        height: 32,
        justifyContent: "center",
        borderRadius: 16,
        borderColor: "white",
        borderWidth: 1,
      },
      btnImage: {
        width: 20,
        height: 20,
        tintColor: "white",
      },
      btnTxt: {
        fontSize: 14,
        color: "white",
      },
    });

    const getHeight: ViewProps["onLayout"] = (event) => {
      const { layout } = event.nativeEvent;
      setHeight(layout.height + 80);
    };
    return (
      <View onLayout={getHeight}>
        <View style={styles.avatarLayout}>
          <Image style={styles.avatar} source={{ uri: userInfo?.avatar }} />
          <Image style={styles.icon_add} source={icon_add} />
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>{userInfo?.nickName}</Text>
            <Text style={styles.nickNameTxt}>
              小红书号：{userInfo?.redBookId}&nbsp;
              <Image style={styles.qrcode} source={icon_qrcode}></Image>
            </Text>
          </View>
        </View>
        <Text style={styles.desc}>{userInfo?.desc}</Text>
        <View style={styles.femaleBox}>
          <Image
            style={styles.female}
            source={userInfo?.sex === "female" ? icon_female : icon_male}
          />
        </View>
        <View onLayout={(event)=>{
          setDefaultAvatarY(event.nativeEvent.layout.y)
        }} style={styles.infoLayout}>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{countInfo?.followCount}</Text>
            <Text style={styles.infoLabel}>关注</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{countInfo?.fans}</Text>
            <Text style={styles.infoLabel}>粉丝</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{countInfo?.favorateCount}</Text>
            <Text style={styles.infoLabel}>赞和收藏</Text>
          </View>
          <View
            style={{
              flex: 1,
            }}
          ></View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.btnTxt}>编辑资料</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                marginLeft: 16,
              },
            ]}
          >
            <Image style={styles.btnImage} source={icon_setting} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const [scrollY, setScrollY] = useState(0);
  const [defaultY, setDefaultY] = useState(0);
  const [defaultAvatarY,setDefaultAvatarY]=useState(0)
  const animateScrollY = useRef(new Animated.Value(defaultY,{
    useNativeDriver:true,
  })).current;
  animateScrollY.setOffset(-defaultY)
  

  
  //设置两个监听函数，目的是当到零界点的时候只执行一次
  const [flag,setFlag]=useState(false)
  //当defaultY和scrollY不断变化时会不断执行该函数
  useEffect(()=>{
    if(scrollY>defaultAvatarY){
      setFlag(true)
    }else{
      setFlag(false)
    }
  },[defaultY,scrollY])
  //但是我们在其内部只改变了flag的值，由于前后值是一样的话就不会触发该函数了
  useEffect(()=>{
    if(flag){
      animate.start()
    }else{
      animate2.start()
    }
  },[flag])

  const [index, setIndex] = useState(0);
  const Tabs = ({ onTabChange }: { onTabChange?: (num: number) => void }) => {
    const styles = StyleSheet.create({
      titleLayout: {
        width: "100%",
        height: 48,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        paddingHorizontal: 16,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#ccc",
      },
      icon_style: {
        width: 28,
        height: 28,
        resizeMode: "cover",
      },
      line: {
        width: 28,
        height: 2,
        backgroundColor: "#ff2442",
        borderRadius: 1,
        position: "absolute",
        bottom: 6,
      },
      tabButton: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
        position: "relative",
      },
      tabTxt: {
        fontSize: 16,
        color: "#999",
      },
      tabTxtSelected: {
        fontSize: 16,
        color: "#333",
      },
    });
    return (
      <Animated.View
        style={[
          styles.titleLayout,
          {
            transform: [
              {
                translateY: scrollY<defaultY?0:animateScrollY,
              },
            ],
            zIndex: 99,
          },
        ]}
        onLayout={(event) => {
          setDefaultY(event.nativeEvent.layout.y);
        }}
      >
        {/* 中间主体内容 */}
        <View style={styles.tabButton}>
          <Pressable
            style={styles.tabButton}
            onPress={() => {
              setIndex(0);
              onTabChange?.(0);
            }}
          >
            <Text style={[index === 0 ? styles.tabTxtSelected : styles.tabTxt]}>
              笔记
            </Text>
            {index === 0 && <View style={styles.line}></View>}
          </Pressable>
        </View>

        <View style={styles.tabButton}>
          <Pressable
            style={styles.tabButton}
            onPress={() => {
              setIndex(1);
              onTabChange?.(1);
            }}
          >
            <Text
              style={[[index === 1 ? styles.tabTxtSelected : styles.tabTxt]]}
            >
              收藏
            </Text>
            {index === 1 && <View style={styles.line}></View>}
          </Pressable>
        </View>

        <View style={styles.tabButton}>
          <Pressable
            style={styles.tabButton}
            onPress={() => {
              setIndex(2);
              onTabChange?.(2);
            }}
          >
            <Text
              style={[[index === 2 ? styles.tabTxtSelected : styles.tabTxt]]}
            >
              赞过
            </Text>
            {index === 2 && <View style={styles.line}></View>}
          </Pressable>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.root}>
      <Image
        style={[
          styles.bgImg,
          {
            height,
          },
        ]}
        source={icon_mine_bg}
      />
      {renderTitle()}
      <Animated.ScrollView
        style={styles.scrollView}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([
          {
            nativeEvent:{
              contentOffset:{
                y:animateScrollY
              }
            }
          }
        ],
        {
          useNativeDriver:true,
          listener:(event)=>{
            const {contentOffset:{y}}=event.nativeEvent as NativeScrollEvent
            /* if(y>defaultY){
              animateScrollY.setValue(y-defaultY)
            }else{
              animateScrollY.setValue(0)
            } */
            setScrollY(y)
          }
        })}
      >
        {renderInfo()}
        <Tabs></Tabs>
        <MineList index={index}></MineList>
      </Animated.ScrollView>
      <SlideMenu ref={slideMenuRef}></SlideMenu>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
  },
  bgImg: {
    position: "absolute",
    width: "100%",
  },
  scrollView: {},
});
