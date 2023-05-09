import { apiConfig } from "./../api/Apis";
import axios, { AxiosResponse } from "axios";
import Toast from "react-native-toast-message"

const app = axios.create();
app.defaults.baseURL = "http://43.143.216.233:7001/";

app.interceptors.request.use((config)=>{
  Toast.show({
    type:'loading',
    text1:'加载中...',
    position:'top',
    autoHide:false,
  })
  return config
})


app.interceptors.response.use(
    response=>{
      Toast.hide()
      return response
    },
    error=>{
        const {response}=error
        if(response){
            const {status}=response
            if(status>=500){
                //服务器报错
            }else if(status===400){
                //接口参数异常
            }else if(status===401){
                //登录信息过期，需要重新登录
            }else{
                //其他错误类型，统一按照接口报错处理
            }
        }else{
            //网络异常
        }
        return Promise.reject(error)
    }
)

//get请求
const get = async (url: string, params?: Record<any, any>) => {
  return await app.get(url, {
    params,
  });
};
//post请求
const post = async (url: string, params?: Record<any, any>) => {
  return await app.post(url, params);
};

//封装通用接口
export const request = async (
  key: keyof typeof apiConfig,
  params?: any
): Promise<AxiosResponse<any, any>> => {
  if (apiConfig[key].method ==='get') {
    return await get(apiConfig[key].url, params);
  } else {
    return await post(apiConfig[key].url, params);
  }
};
