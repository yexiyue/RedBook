import icon_heart_empty from "../assets/icon_heart_empty.png";
import icon_heart from "../assets/icon_heart.png";
import { Animated, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useRef, useState } from "react";

type Props={
	value:boolean,
	size?:number,
	onValueChange?:(newValue:boolean)=>void
}

export const Heart = ({value,onValueChange,size=16}:Props) => {

  const [showState,setShowState]=useState(value)

	const scale=useRef(new Animated.Value(0)).current
	const alpha=useRef(new Animated.Value(1)).current

	const scaleAnimate=Animated.timing(scale,{
		useNativeDriver:false,
		toValue:1.8,
		duration:300
	})

	const alphaAnimate=Animated.timing(alpha,{
		useNativeDriver:false,
		toValue:0,
		duration:400,
		delay:200
	})

	const animate=Animated.parallel([scaleAnimate,alphaAnimate])

	const onHeartPress=()=>{
		onValueChange?.(!showState)
		
		setShowState(preValue=>!preValue)
		if(!showState){
			animate.start()
		}else{
			animate.reset()
		}
	}

  return (
    <TouchableOpacity onPress={onHeartPress}>
      <Image style={[styles.icon_heart,{
				width:size,
				height:size
			}]} source={showState?icon_heart:icon_heart_empty}></Image>

			{/* 加点击特效 */}
			<Animated.View style={{
				width:size,
				height:size,
				borderRadius:size/2,
				borderWidth:size/16,
				position:'absolute',
				borderColor:'#ff2442',
				zIndex:9,
				transform:[
					{
						scale:scale
					}
				],
				opacity:alpha
			}}></Animated.View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  icon_heart: {
    width: 16,
    height: 16,
    resizeMode: "cover",
  },
});
