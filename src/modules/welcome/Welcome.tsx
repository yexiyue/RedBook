import { Image, StyleSheet, Text, View } from "react-native"

import welcomeImage from '../../assets/icon_main_logo.png'
import { useNavigation } from "@react-navigation/native"
import { useEffect } from "react"
import { StackNavigationProp } from "@react-navigation/stack"
import { getItem } from "../../utils/storage"
import { useUserStore } from "../../stores/UserStore"

export const Welcome=()=>{

    const navigator=useNavigation<StackNavigationProp<any>>()
    
    useEffect(()=>{
        setTimeout(async()=>{
            //如果本地有用户信息直接跳到首页
            const userInfo=await getItem('userInfo')
            if(userInfo?.state?.userInfo){
                navigator.replace('mainTab')
            }else{
                navigator.replace('login')
            }
            /* navigator.replace('mainTab') */
        },500)
    },[])

    return <View style={styles.root}>
        <Image source={welcomeImage} style={styles.img} ></Image>
    </View>
}

const styles=StyleSheet.create({
    root:{
        backgroundColor:'white',
        width:'100%',
        height:'100%',
        alignItems:'center'
    },
    img:{
        width:200,
        height:100,
        resizeMode:'contain',
        marginTop:200
    }
})