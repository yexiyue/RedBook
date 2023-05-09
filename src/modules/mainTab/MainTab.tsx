import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../home/Home";
import { Shop } from "../shop/Shop";
import { Message } from "../message/Message";
import { Mine } from "../mine/Mine";
import { Image, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { BottomTabNavigationConfig } from "@react-navigation/bottom-tabs/lib/typescript/src/types";

import icon_tab_publish from '../../assets/icon_tab_publish.png'
import {launchImageLibrary} from 'react-native-image-picker'


const BottomTab = createBottomTabNavigator();

export const MainTab = () => {
  const RedBookTabBar: BottomTabNavigationConfig["tabBar"] = ({
    state,
    navigation,
    descriptors,
  }) => {
    const { routes, index } = state;
    return (
      <View style={styles.tabBarContainer}>
        {routes.map((item, i) => {
          const { options } = descriptors[item.key];
          const isFocused = i === index;

          const onPublishPress=() => {
            //选择图片
            launchImageLibrary({
              mediaType:'photo',
              quality:1,
              includeExtra:true
            },({assets})=>{
              if(assets?.length===0){
                ToastAndroid.show('选择图片失败',ToastAndroid.LONG)
                return;
              }
              console.log(assets![0])
            })
          }

					//中间图片publish TabBar
					if(i===2){
						return (
							<TouchableOpacity
								style={styles.tabItem}
								onPress={onPublishPress}
								key={item.name}
							>
								<Image style={styles.icon_tab_publish} source={icon_tab_publish} />
							</TouchableOpacity>
						);
					}
          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => {
								navigation.navigate(item.name)
                if(item.name=='mine'){
                  StatusBar.setBarStyle("light-content")
                  StatusBar.setBackgroundColor('transparent')
                  StatusBar.setTranslucent(true)
                }else{
                  StatusBar.setBarStyle("dark-content")
                  StatusBar.setBackgroundColor('white')
                  StatusBar.setTranslucent(false)
                }
              }}
              key={item.name}
            >
              <Text style={{
								fontSize:isFocused?18:16,
								color:isFocused?'#333':'#999',
								fontWeight:isFocused?'bold':'normal'
							}}>{options.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <>
      <BottomTab.Navigator 
      initialRouteName="home" 
      tabBar={RedBookTabBar}
        screenOptions={{
          headerShown:false,
        }}
      
      >
        <BottomTab.Screen
          name="home"
          component={Home}
          options={{
            title: "首页",
          }}
        />
        <BottomTab.Screen
          name="shop"
          component={Shop}
          options={{
            title: "购物",
          }}
        />
				<BottomTab.Screen
          name="publish"
          component={Shop}
          options={{
            title: "发布",
          }}
        />
        <BottomTab.Screen
          name="message"
          component={Message}
          options={{
            title: "消息",
          }}
        />
        <BottomTab.Screen
          name="mine"
          component={Mine}
          options={{
            title: "我",
          }}
        />
      </BottomTab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    height: 52,
  },
  tabItem: {
    height: "100%",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
	icon_tab_publish:{
		width:58,
		height:42,
		resizeMode:'contain'
	}
});
