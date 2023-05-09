import { create } from "zustand";
import { request } from "../../utils/request";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
type HomeStore = {
  homeList: ArticleSimple[];
  categoryList: Category[];
  page: number;
  size: number;
  refreshing: boolean;
  requestHomeList: () => Promise<any>;
  setPage: (page: number) => void;
  getCategoryList:()=>void;
  setCategoryList:(data:Category)=>void
};

export const useHomeStore = create(
  persist<HomeStore>((set, get) => ({
    homeList: [],
    page: 1,
    size: 10,
    categoryList:[],
    refreshing: false,
    requestHomeList: async () => {
      if (get().refreshing) return;
      set(() => ({ refreshing: true }));

      const page = get().page;

      const { data } = await request("homeList", {
        page,
        size: get().size,
      });

      try {
        if (data?.length) {
          if (page === 1) {
            set(() => ({ homeList: data }));
          } else {
            set((state) => ({ homeList: state.homeList.concat(data) }));
          }
          get().setPage(page + 1);
        } else {
          if (page === 1) {
            set(() => ({ homeList: [] }));
          } else {
            //已经加载完了，没有更多数据了
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        set(() => ({ refreshing: false }));
      }
      return data;
    },
    setPage: (page: number) => {
      set(() => ({ page: page }));
    },

    //对数据进行初始化
    getCategoryList:()=>{
      const categoryList=get().categoryList
      if(categoryList.length===0){
        set(()=>({categoryList:DEFAULT_CATEGORY_LIST}))
      }else{
        /* set(()=>({categoryList:DEFAULT_CATEGORY_LIST})) */
        set(()=>({categoryList:categoryList}))
      }
    },

    setCategoryList:(data:Category)=>{
      const categoryList=get().categoryList
      set(()=>({categoryList:[...categoryList.filter(item=>item.name!==data.name),data]}))
    }
  }),
  {
    storage:createJSONStorage(()=>AsyncStorage),
    name:'homeStore',
    partialize:(state):any=>({categoryList:state.categoryList})
  }
  )
);

const DEFAULT_CATEGORY_LIST: Category[] = [
  // 默认添加频道
  { name: "推荐", default: true, isAdd: true },
  { name: "视频", default: true, isAdd: true },
  { name: "直播", default: true, isAdd: true },
  { name: "摄影", default: false, isAdd: true },

  { name: "穿搭", default: false, isAdd: true },
  { name: "读书", default: false, isAdd: true },
  { name: "影视", default: false, isAdd: true },
  { name: "科技", default: false, isAdd: true },

  { name: "健身", default: false, isAdd: true },
  { name: "科普", default: false, isAdd: true },
  { name: "美食", default: false, isAdd: true },
  { name: "情感", default: false, isAdd: true },

  { name: "舞蹈", default: false, isAdd: true },
  { name: "学习", default: false, isAdd: true },
  { name: "男士", default: false, isAdd: true },
  { name: "搞笑", default: false, isAdd: true },

  { name: "汽车", default: false, isAdd: true },
  { name: "职场", default: false, isAdd: true },
  { name: "运动", default: false, isAdd: true },
  { name: "旅行", default: false, isAdd: true },

  { name: "音乐", default: false, isAdd: true },
  { name: "护肤", default: false, isAdd: true },
  { name: "动漫", default: false, isAdd: true },
  { name: "游戏", default: false, isAdd: true },

  // 默认添加频道
  { name: "家装", default: false, isAdd: false },
  { name: "心理", default: false, isAdd: false },
  { name: "户外", default: false, isAdd: false },
  { name: "手工", default: false, isAdd: false },

  { name: "减脂", default: false, isAdd: false },
  { name: "校园", default: false, isAdd: false },
  { name: "社科", default: false, isAdd: false },
  { name: "露营", default: false, isAdd: false },

  { name: "文化", default: false, isAdd: false },
  { name: "机车", default: false, isAdd: false },
  { name: "艺术", default: false, isAdd: false },
  { name: "婚姻", default: false, isAdd: false },

  { name: "家居", default: false, isAdd: false },
  { name: "母婴", default: false, isAdd: false },
  { name: "绘画", default: false, isAdd: false },
  { name: "壁纸", default: false, isAdd: false },

  { name: "头像", default: false, isAdd: false },
];
