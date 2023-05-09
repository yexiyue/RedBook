import {
  FlatListProps,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  Platform,
} from "react-native";

import { useCallback, useEffect } from "react";
import { useHomeStore } from "./useHomeStore";

import FlowList from "../../component/flowlist/FlowList.js";
import { ResizeImage } from "../../component/ResizeImage";
import { Heart } from "../../component/Heart";
import { TitleBar } from "./components/TitleBar";

import { Category } from "./components/CategoryList";
import { StackNavigationState, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

//1.导入配置文件
import _updateConfig from "../../../update.json";
import { withPushy } from "../../component/withPushy";
//@ts-ignore
const { appKey } = _updateConfig[Platform.OS];

const { width } = Dimensions.get("screen");

export const Home = withPushy(() => {
  //获取状态
  const [homeList, requestHomeList, setPage, refreshing] = useHomeStore(
    (state) => [
      state.homeList,
      state.requestHomeList,
      state.setPage,
      state.refreshing,
      state.page,
    ]
  );

  const getCategoryList = useHomeStore((state) => state.getCategoryList);

  //初始请求数据
  useEffect(() => {
    requestHomeList();
    getCategoryList();
  }, []);

  

  //刷新数据
  const refreshData = () => {
    setPage(1);
    requestHomeList();
  };

  //上拉加载
  const endReachedHandle = () => {
    requestHomeList();
  };

  //跳转到详情页
  const navigator =
    useNavigation<StackNavigationProp<RouteParams, "articleDetail">>();
  const articleClickHandle = useCallback(
    (article: ArticleSimple) => () => {
      navigator.push("articleDetail", {
        id: article.id,
      });
    },
    []
  );

  /* 渲染每个文章 */
  const renderItem: FlatListProps<ArticleSimple>["renderItem"] = ({ item }) => {
    return (
      <Pressable
        onPress={articleClickHandle(item)}
        key={item.id}
        style={styles.item}
      >
        {/* 首图 */}
        <ResizeImage style={styles.itemImage} source={{ uri: item.image }} />
        {/* 标题 */}
        <Text style={styles.titleTxt}>{item.title}</Text>
        {/* 发布者 */}
        <View style={styles.authorBox}>
          <Image
            style={styles.avatarImage}
            source={{ uri: item.avatarUrl }}
          ></Image>
          <Text style={styles.nameTxt}>{item.userName}</Text>
          <Heart
            value={item.isFavorite}
            onValueChange={(value) => {
              console.log(value);
            }}
          ></Heart>
          <Text style={styles.favoriteCount}>{item.favoriteCount}</Text>
        </View>
      </Pressable>
    );
  };

  const Footer = () => {
    return <Text style={styles.footer}>没有更多数据了~</Text>;
  };

  return (
    <View style={styles.root}>
      <TitleBar
        onTabChange={(tab) => {
          console.log(tab);
        }}
      ></TitleBar>
      <FlowList
        style={styles.homeList}
        data={homeList}
        renderItem={renderItem}
        numColumns={2}
        //下拉刷新
        refreshing={refreshing}
        keyExtractor={(item: { id: any }) => `${item.id}`}
        onRefresh={refreshData}
        //距离底部多少百分比加载更多
        onEndReachedThreshold={0.1}
        //上拉加载
        onEndReached={endReachedHandle}
        ListFooterComponent={Footer}
        ListHeaderComponent={<Category></Category>}
      ></FlowList>
    </View>
  );
},appKey);

const styles = StyleSheet.create({
  root: {
    height: "100%",
    width: "100%",
    backgroundColor: "#f0f0f0",
  },
  homeList: {
    height: "100%",
    width: "100%",
  },
  item: {
    width: (width - 18) >> 1,
    /* height: 260, */
    backgroundColor: "white",
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 8,
    overflow: "hidden",
  },
  itemImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  titleTxt: {
    fontSize: 14,
    color: "#333",
    marginHorizontal: 10,
    marginVertical: 4,
    fontWeight: "bold",
  },
  avatarImage: {
    width: 20,
    height: 20,
    resizeMode: "cover",
    borderRadius: 10,
  },
  authorBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 20,
  },
  nameTxt: {
    marginLeft: 4,
    color: "#999",
    fontSize: 12,
    flex: 1,
  },

  favoriteCount: {
    marginLeft: 4,
    color: "#999",
    fontSize: 12,
  },
  footer: {
    fontSize: 14,
    width: "100%",
    color: "#999",
    marginVertical: 16,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
