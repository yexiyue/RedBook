/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from "react";
import { StatusBar } from "react-native";
import {SafeAreaProvider} from 'react-native-safe-area-context'
import { Router } from "./src/router";
import { CustomToast } from "./src/component/CustomToast";


export default function App(): JSX.Element {
  return (
    <SafeAreaProvider style={{
      width:"100%",
      height:'100%'
    }}>
      <StatusBar barStyle="dark-content" backgroundColor="white"></StatusBar>
      <Router></Router>
      {/* 先在根组件中注册 */}
      <CustomToast/>
    </SafeAreaProvider>
  );
}
