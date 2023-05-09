import { create } from "zustand";
import { request } from "../../utils/request";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export const useMessageStore=create<{
    messageList:MessageListItem[],
    page:number,
    refreshing:boolean,
    requestMessageList:()=>Promise<void>
}>((set,get)=>({
    messageList:[],
    page:1,
    refreshing:false,
    requestMessageList:async ()=>{
        if(get().refreshing)return
        let page=get().page
        set({refreshing:true})
        try {
            const {data}=await request('messageList',{
                page,
                size:5
            })
            if(data?.length){
                if(page==1){
                    set({messageList:data})
                }else{
                    set((state)=>({messageList:state.messageList.concat(data)}))
                }
                set({page:page+1})
            }else{
                if(page==1){
                    set({messageList:[]})
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