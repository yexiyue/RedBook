import { forwardRef, useImperativeHandle, useState } from "react";
import {
  Dimensions,
  Image,
  LayoutAnimation,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import icon_setting from "../../assets/icon_setting.png";
import icon_service from "../../assets/icon_service.png";
import icon_scan from "../../assets/icon_scan.png";

import icon_fid_user from "../../assets/icon_find_user.png";
import icon_draft from "../../assets/icon_draft.png";
import icon_create_center from "../../assets/icon_create_center.png";
import icon_browse_histroy from "../../assets/icon_browse_history.png";
import icon_packet from "../../assets/icon_packet.png";
import icon_free_net from "../../assets/icon_free_net.png";
import icon_nice_goods from "../../assets/icon_nice_goods.png";
import icon_orders from "../../assets/icon_orders.png";
import icon_shop_car from "../../assets/icon_shop_car.png";
import icon_coupon from "../../assets/icon_coupon.png";
import icon_wish from "../../assets/icon_wish.png";
import icon_red_vip from "../../assets/icon_red_vip.png";
import icon_community from "../../assets/icon_community.png";
import icon_exit from "../../assets/icon_exit.png";

const containerWidth=Dimensions.get('screen').width*0.7

const MENUS = [
  [{ icon: icon_fid_user, name: "发现好友" }],
  [
    { icon: icon_draft, name: "我的草稿" },
    { icon: icon_create_center, name: "创作中心" },
    { icon: icon_browse_histroy, name: "浏览记录" },
    { icon: icon_packet, name: "钱包" },
    { icon: icon_free_net, name: "免流量" },
    { icon: icon_nice_goods, name: "好物体验" },
  ],
  [
    { icon: icon_orders, name: "订单" },
    { icon: icon_shop_car, name: "购物车" },
    { icon: icon_coupon, name: "卡券" },
    { icon: icon_wish, name: "心愿单" },
    { icon: icon_red_vip, name: "小红书会员" },
  ],
  [
    { icon: icon_community, name: "社区公约" },
    { icon: icon_exit, name: "退出登陆" },
  ],
];

const BOTTOM_MENUS = [
  { icon: icon_setting, txt: "设置" },
  { icon: icon_service, txt: "帮助与客服" },
  { icon: icon_scan, txt: "扫一扫" },
];

import { ScrollView } from "react-native-gesture-handler";
import { useUserStore } from "../../stores/UserStore";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type SlideMenuRef = {
  show: () => void;
  hide: () => void;
};

export const SlideMenu = forwardRef<SlideMenuRef>((props, ref) => {
  const [isVisible, setVisible] = useState(false);

  const [open, setOpen] = useState(false);

  const hide=() => {
    LayoutAnimation.easeInEaseOut();
    setOpen(false);
    setTimeout(() => {
      setVisible(false);
    }, 300);
  }
  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        setOpen(true);
      }, 100);
      
    },
    hide
  }));

  const navigation=useNavigation<StackNavigationProp<any>>()

  const renderContent = () => {
    const styles = StyleSheet.create({
      root: {
        backgroundColor: "white",
        width: "70%",
        height: "100%",
      },
      scrollView: {
        flex: 1,
        width: "100%",
      },
      bottomLayout: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 12,
        paddingBottom: 20,
      },
      bottomImage: {
        width: 26,
        height: 26,
        resizeMode: "cover",
      },
      imageBox: {
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 23,
      },
      bottomTxt: {
        fontSize: 14,
        color: "#666",
        marginTop: 8,
      },
      bottomItem: {
        flex: 1,
        alignItems: "center",
        
      },
      menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 28,
        paddingVertical:10,
        marginTop:12
      },
      menuItemIcon: {
        width: 24,
        height: 24,
        resizeMode: "cover",
      },
      menuItemName: {
        fontSize: 14,
        color: "#333",
        marginLeft: 10,
        fontWeight: "bold",
      },
      menuBox: {
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
      },
    });

    const onButtonHandle=(i:string)=>{
      if(i==='退出登陆'){
        hide()
        useUserStore.setState({})
        //重置路由
        navigation.reset({
          index:0,
          routes:[{
            name:'login'
          }]
        })
      }else{
        console.log(i)
      }
    }

    return (
      <Pressable style={[styles.root,,{
        marginLeft:open?0:-containerWidth
      }]}>
        <ScrollView
          style={[styles.scrollView]}
          contentContainerStyle={{
            paddingTop: 100,
          }}
          showsVerticalScrollIndicator={false}
        >
          {MENUS.map((item, index) => {
            return (
              <View
                style={[
                  styles.menuBox,
                  {
                    borderBottomWidth: index === MENUS.length - 1 ? 0 : 1,
                  },
                ]}
                key={`${JSON.stringify(item)}`}
              >
                {item.map((i) => (
                  <Pressable android_ripple={{
                    color:'#eee'
                  }} onPress={()=>onButtonHandle(i.name)} style={styles.menuItem} key={`${i.name}`}>
                    <Image style={styles.menuItemIcon} source={i.icon} />
                    <Text style={styles.menuItemName}>{i.name}</Text>
                  </Pressable>
                ))}
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.bottomLayout}>
          {BOTTOM_MENUS.map(({ icon, txt }) => (
            <Pressable  style={styles.bottomItem} key={txt}>
              <View style={styles.imageBox}>
                <Image style={styles.bottomImage} source={icon} />
              </View>
              <Text style={styles.bottomTxt}>{txt}</Text>
            </Pressable>
          ))}
        </View>
      </Pressable>
    );
  };

  return (
    <Modal
      onRequestClose={hide}
      visible={isVisible}
      statusBarTranslucent
      transparent
      animationType="fade"
    >
      <Pressable
        onPress={hide}
        style={styles.root}
        
      >
        {renderContent()}
      </Pressable>
    </Modal>
  );
});

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#000000BF",
    flex: 1,
  },
});
