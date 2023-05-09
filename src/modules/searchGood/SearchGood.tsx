import { Image, LayoutAnimation, Pressable, StyleSheet, Text, View } from "react-native"
import icon_arrow from '../../assets/icon_arrow.png'
import icon_search from '../../assets/icon_search.png'
import { TextInput } from "react-native-gesture-handler"
import { useEffect, useRef } from "react"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
export const SearchGood=()=>{

    const ref=useRef<TextInput>(null)
    const navigation=useNavigation<StackNavigationProp<RouteParams>>()

    useEffect(()=>{
        ref.current?.focus()
    },[])
    return <View style={styles.root}>
        <View style={styles.header}>
            <Pressable onPress={()=>{
                LayoutAnimation.easeInEaseOut()
                navigation.pop()
            }}><Image style={styles.image} source={icon_arrow} /></Pressable>
            <View  style={styles.inputBox}>
                <Image style={styles.image} source={icon_search}/>
                <TextInput ref={ref} style={styles.input} placeholder="睡眠面膜" />
            </View>
            <Text style={styles.txt}>搜索</Text>
        </View>
    </View>
}

const styles=StyleSheet.create({
    root:{
        backgroundColor:'white',
        flex:1
    },
    header:{
        flexDirection:'row',
        height:52,
        alignItems:'center',
        paddingHorizontal:12,
        
    },
    inputBox:{
        flexDirection:'row',
        flex:1,
        alignItems:'center',
        backgroundColor:'#eee',
        height:36,
        paddingHorizontal:12,
        borderRadius:18,
        marginRight:12,
    },
    image:{
        width:25,
        height:25,
        resizeMode:'cover'
    },
    input:{
        flex:1,
        padding:0
    },
    txt:{
        color:'#666',
        fontSize:16
    }
})