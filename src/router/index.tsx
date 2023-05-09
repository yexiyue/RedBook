import { NavigationContainer } from "@react-navigation/native";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { Welcome } from "../modules/welcome/Welcome";
import { Login } from "../modules/login/Login";
import { MainTab } from "../modules/mainTab/MainTab";
import { ArticleDetail } from "../modules/articleDetail/ArticleDetail";
import { SearchGood } from "../modules/searchGood/SearchGood";

const Stack = createStackNavigator();
export const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="welcome"
        screenOptions={{
          cardStyle: {
            elevation: 1,
            
          },
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen
          name="welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="mainTab"
          component={MainTab}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="articleDetail"
          component={ArticleDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="searchGood"
          component={SearchGood}
          options={{
            headerShown: false,
            /* 确定该屏幕是什么类型 */
            presentation:'transparentModal',
            ...TransitionPresets.ModalFadeTransition
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
