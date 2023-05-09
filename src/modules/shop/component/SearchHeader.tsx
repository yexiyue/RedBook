import { Image, LayoutAnimation, Pressable, StyleSheet, Text, View } from "react-native"
import icon_search from '../../../assets/icon_search.png';
import icon_shop_car from '../../../assets/icon_shop_car.png';
import icon_orders from '../../../assets/icon_orders.png';
import icon_menu_more from '../../../assets/icon_menu_more.png';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
export const SearchHeader=()=>{
    const navigation=useNavigation<StackNavigationProp<RouteParams>>()
    return <View style={styles.root}>
        <Pressable onPress={()=>{
            LayoutAnimation.easeInEaseOut()
            navigation.push('searchGood')
        }} style={styles.searchPressable}>
            <View style={{
                flexDirection:'row'
            }}>
            <Image style={{
                width:20,
                height:20,
                marginRight:6
            }} source={icon_search}/>
            <Text>手机壳</Text>
            </View>
            <View style={styles.search}>
                <Text style={styles.searchTxt}>搜索</Text>
            </View>
        </Pressable>
        <Image style={styles.imageStyle} source={icon_shop_car}/>
        <Image style={styles.imageStyle} source={icon_orders}/>
        <Image style={styles.imageStyle} source={icon_menu_more}/>
    </View>
}

const styles=StyleSheet.create({
    root:{
        flexDirection:'row',
        paddingHorizontal:10,
        height:52,
        alignItems:'center',
        backgroundColor:'white'
    },
    imageStyle:{
        width:25,
        height:25,
        marginLeft:10
    },
    searchPressable:{
        flexDirection:'row',
        flex:1,
        backgroundColor:'#eee',
        height:36,
        paddingLeft:12,
        alignItems:'center',
        borderRadius:18,
        justifyContent:'space-between'
    },
    search:{
        backgroundColor:'#ff2442',
        height:"100%",
        width:60,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:18
    },
    searchTxt:{
        color:'white'
    }
})