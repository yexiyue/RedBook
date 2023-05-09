import { useEffect, useState } from "react"
import { Dimensions, Image, StyleSheet, Text, View } from "react-native"
import { request } from "../../../utils/request"
const {width}=Dimensions.get('screen')
export const GoodListHeader=()=>{
    const [goodCategory,setCategory]=useState<GoodsCategory[]>([])
    useEffect(()=>{
        request('top10Category').then(res=>{
            setCategory(res.data)
        })
    },[])
    return <View style={styles.root}>
        {goodCategory.map((item)=>{
            return <View style={styles.container} key={item.id}>
                <Image style={styles.image} source={{uri:item.image}}/>
                <Text style={styles.text}>{item.name}</Text>
            </View>
        })}
    </View>
}
const styles=StyleSheet.create({
    root:{
        backgroundColor:'white',
        flexWrap:'wrap',
        width:'100%',
        flexDirection:'row',
        paddingHorizontal:10,
        paddingTop:20
    },
    image:{
        width:50,
        height:50
    },
    text:{
        fontSize:10,
        color:'#333',
        fontWeight:'bold'
    },
    container:{
        width:(width-20)/5,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:15
    }
})