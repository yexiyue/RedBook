import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setItem(key:string,value:any){
    try {
        if(typeof value!=='string' && value){
            value=JSON.stringify(value)
        }
        return AsyncStorage.setItem(key,value)
    } catch (error) {
        console.error(error)
    }
}

export async function getItem(key:string){
    try {
        const data=await AsyncStorage.getItem(key)
        return JSON.parse(data!)
    } catch (error) {
        console.error(error)
    }
}