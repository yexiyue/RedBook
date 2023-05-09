import { create } from "zustand";
import { request } from "../../utils/request";
import  Toast from "react-native-toast-message";

export const useShopStore=create<{
    goodList:GoodsSimple[],
    page:number,
    refreshing:boolean,
    requestGoodList:()=>Promise<void>,
    setPage:(page:number)=>void
}>((set,get)=>({
    goodList:[],
    page:1,
    refreshing:false,
    setPage:(data:number)=>{
        set({page:data})
    },
    async requestGoodList(){
        if(get().refreshing) return
        let page=get().page
        try {
            set({refreshing:true})
            const {data}=await request('goodList',{
                page,
                size:10
            })
            if(data?.length){
                if(page==1){
                    set({goodList:data})
                }else{
                    set((state)=>({goodList:state.goodList.concat(data)}))
                }
                set({page:page+1})
            }else{
                if(page==1){
                    set({goodList:[]})
                }
            }
        } catch (error) {
            Toast.show({
                type:'error',
                text1:`${error}`
            })
        }finally{
            set({refreshing:false})
        }
    }
}))