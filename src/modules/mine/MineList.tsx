import { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import { request } from "../../utils/request";
import { Empty } from "../../component/Empty";
import icon_no_note from "../../assets/icon_no_note.webp";
import icon_no_collection from "../../assets/icon_no_collection.webp";
import icon_no_favorate from "../../assets/icon_no_favorate.webp";
import { ResizeImage } from "../../component/ResizeImage";
import { Heart } from "../../component/Heart";
const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const EMPTY_CONFIG = [
  { icon: icon_no_note, tips: "快去发布今日的好心情吧～" },
  { icon: icon_no_collection, tips: "快去收藏你喜欢的作品吧～" },
  { icon: icon_no_favorate, tips: "喜欢点赞的人运气不会太差哦～" },
];
type Props = {
  index: number;
};
export const MineList = ({ index }: Props) => {
  const [allList, setAllList] = useState<ArticleSimple[][]>([[], [], []]);
  useEffect(() => {
    Promise.all([
      request("noteList").then(({ data }) => data),
      request("collectionList").then(({ data }) => data),
      request("favorateList").then(({ data }) => data),
    ]).then((res) => setAllList(res));
  }, []);
  const currentList = useMemo(() => allList[index], [allList, index]);

  if (currentList?.length === 0) {
    return (
      <Empty
        icon={EMPTY_CONFIG[index].icon}
        tips={EMPTY_CONFIG[index].tips}
      ></Empty>
    );
  }

  return (
    <View style={[styles.root]}>
      {currentList?.map((item) => {
        return (
          <Pressable style={styles.item} key={item.id}>
            <Image style={styles.itemImg} source={{ uri: item.image }} />
            <Text style={styles.titleTxt}>{item.title}</Text>
            <View style={styles.nameLayout}>
              <Image
                style={styles.avatarImg}
                source={{ uri: item.avatarUrl }}
              />
              <Text style={styles.nameTxt}>{item.userName}</Text>
              <Heart
                value={item.isFavorite}
              />
              <Text style={styles.countTxt}>{item.favoriteCount}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor:'white',
  },
  listContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
  },
  item: {
    width: (SCREEN_WIDTH - 18) >> 1,
    backgroundColor: "white",
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 8,
  },
  titleTxt: {
    fontSize: 14,
    color: "#333",
    marginHorizontal: 10,
    marginVertical: 4,
  },
  nameLayout: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  avatarImg: {
    width: 20,
    height: 20,
    resizeMode: "cover",
    borderRadius: 10,
  },
  nameTxt: {
    fontSize: 12,
    color: "#999",
    marginLeft: 6,
    flex: 1,
  },
  heart: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  countTxt: {
    fontSize: 14,
    color: "#999",
    marginLeft: 4,
  },
  itemImg: {
    width: (SCREEN_WIDTH - 18) >> 1,
    height: 240,
  },
});
