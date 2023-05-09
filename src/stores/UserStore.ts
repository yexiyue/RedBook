import { create } from "zustand";
import { request } from "../utils/request";
import { getItem, setItem } from "../utils/storage";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserStore={
    userInfo: {
      avatar: string;
      desc: string;
      location: string;
      name: string;
      nickName: string;
      redBookId: number;
      sex: string;
    } | null;
    requestLogin: (a: string, b: string) => Promise<any>;
  }
export const useUserStore = create(
  //使用ZuStand内置的中间件
  persist<UserStore>(
    (set) => ({
      userInfo: null,
      requestLogin: async (pureNumber: string, pwd: string) => {
        try {
          const { data } = await request("login", {
            name: pureNumber,
            pwd,
          });
          if (data) {
            set(() => ({ userInfo: data }));
          }
          return data;
        } catch (error) {
          console.log(error);
        }
      },
    }),
    //初始化本地存贮信息
    {
      name: "userInfo",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
