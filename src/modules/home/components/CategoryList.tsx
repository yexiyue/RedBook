import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useHomeStore } from "../useHomeStore";
import { ScrollView } from "react-native-gesture-handler";
import icon_arrow from "../../../assets/icon_arrow.png";
import { useMemo, useRef, useState } from "react";
import { CategoryModal, CategoryModalRef } from "./CategoryModal";
type Props={
    name?:string,
    onNameChange?:(name:string)=>void
}
export const Category = ({name='推荐',onNameChange}:Props) => {
    const categoryList = useHomeStore((state) => state.categoryList);
    const [selectName,setSelectName]=useState(name)
    const myList=useMemo(()=>{
        return categoryList.filter(item=>item.isAdd)
    },[categoryList])

    const modalRef=useRef<CategoryModalRef>(null)

  return (
    <>
    <View style={styles.container}>
      <ScrollView 
        style={styles.categoryBox} 
        horizontal 
        showsHorizontalScrollIndicator={false}
      >
        {myList.map(item=><TouchableOpacity 
        style={styles.itemBox} 
        onPress={()=>{
            setSelectName(item.name)
            onNameChange?.(item.name)
        }}
        key={item.name}>
            <Text style={selectName===item.name?styles.itemSelectedTxt:styles.itemTxt}>{item.name}</Text>
        </TouchableOpacity>)}
      </ScrollView>
      <TouchableOpacity style={styles.arrowButton} onPress={modalRef.current?.show}>
        <Image style={styles.icon_arrow} source={icon_arrow} />
      </TouchableOpacity>
    </View>
    <CategoryModal ref={modalRef} ></CategoryModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 36,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
    alignItems:'center',
    marginBottom:6
  },
  arrowButton: {
    height:'100%',
    width:40,
    justifyContent:'center',
    alignItems:'center'
  },
  icon_arrow: {
    width: 20,
    height: 20,
    transform:[{
        rotate:'-90deg'
    }]
  },
  categoryBox: {},
  itemBox:{
    marginHorizontal:14
  },
  itemTxt:{
    fontSize:16,
    color:'#999'
  },
  itemSelectedTxt:{
    fontSize:16,
    color:'#333',
    fontWeight:'bold'
  }
});
