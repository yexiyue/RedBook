import { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { request } from "../../utils/request";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import icon_arrow from "../../assets/icon_arrow.png";
import icon_share from "../../assets/icon_share.png";
import { StackNavigationProp } from "@react-navigation/stack";
import { ImageSlider } from "react-native-image-slider-banner";
import { useUserStore } from "../../stores/UserStore";
import { TextInput } from "react-native-gesture-handler";
import dayjs from "dayjs";
import { Heart } from "../../component/Heart";
import icon_collection from '../../assets/icon_collection.png'
import icon_collection_selected from '../../assets/icon_collection_selected.png'
import icon_comment from '../../assets/icon_comment.png'
import icon_edit from '../../assets/icon_edit_comment.png'
//定义类型
const { width: screenWidth } = Dimensions.get("screen");
export const ArticleDetail = () => {
  const [article, setArticle] = useState<Article>();

  const user = useUserStore((state) => state.userInfo);
  //使用详细类型
  const route = useRoute<RouteProp<RouteParams, "articleDetail">>();

  const id = route.params?.id;

  useEffect(() => {
    request("articleDetail", {
      id,
    }).then((res) => {
      console.log(res.data);
      setArticle(res.data);
    });
  }, [id]);

  const navigation = useNavigation<StackNavigationProp<RouteParams>>();

  const renderTitle = () => {
    return (
      <View style={styles.titleLayout}>
        <Pressable
          hitSlop={20}
          onPress={() => {
            navigation.pop();
          }}
          style={styles.backButton}
        >
          <Image style={styles.icon_arrow} source={icon_arrow}></Image>
        </Pressable>
        <Image
          style={styles.avatarImage}
          source={{ uri: article?.avatarUrl }}
        ></Image>
        <Text style={styles.userTxt}>{article?.userName}</Text>
        <Pressable style={styles.favoriteButton}>
          <Text style={styles.favoriteTxt}>关注</Text>
        </Pressable>
        <Pressable hitSlop={20}>
          <Image style={styles.icon_share} source={icon_share}></Image>
        </Pressable>
      </View>
    );
  };

  //获取图片宽高大小
  const [height, setHeight] = useState(400);
  useEffect(() => {
    if (!article?.images) return;
    Image.getSize(article?.images[0] as any, (w, h) => {
      setHeight((h / w) * screenWidth);
    });
  }, [article?.images]);

  const renderImages = () => {
    return (
      <View style={{ paddingBottom: 30 }}>
        <ImageSlider
          data={[...(article!.images.map((item) => ({ img: item })) as any)]}
          autoPlay={false}
          closeIconColor="white"
          caroselImageStyle={{
            height,
          }}
          preview={false}
          indicatorContainerStyle={{
            bottom: -40,
          }}
          activeIndicatorStyle={{
            width: 6,
            height: 6,
            backgroundColor: "#ff2442",
            borderRadius: 3,
            marginHorizontal: 1,
          }}
          inActiveIndicatorStyle={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: "#c0c0c0",
            marginHorizontal: 1,
          }}
        ></ImageSlider>
      </View>
    );
  };

  const renderInfo = () => {
    const tags = article?.tag.map((i) => `# ${i}`).join(" ");
    return (
      <>
        <Text style={styles.articleTitle}>{article?.title}</Text>
        <Text style={styles.descTxt}>{article?.desc}</Text>
        <Text style={styles.tags}>{tags}</Text>
        <Text style={styles.timeAndLocation}>{article?.dateTime}</Text>
        <View style={styles.line}></View>
      </>
    );
  };

  const renderComments = () => {
    const styles = StyleSheet.create({
      commentsCountTxt: {
        fontSize: 14,
        paddingHorizontal: 16,
        color: "#666",
        marginTop: 20,
      },
      inputLayout: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
      },
      userAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        resizeMode: "cover",
      },
      inputStyle: {
        backgroundColor: "#eee",
        flex: 1,
        borderRadius: 16,
        height: 32,
        marginLeft: 12,
        padding: 0,
        paddingLeft: 12,
        fontSize: 14,
      },
      commentsContainer: {
        padding: 16,
        paddingBottom: 32,
      },
      commentItem: {
        flexDirection: "row",
      },
      avatarImage: {
        width: 32,
        height: 32,
        borderRadius: 16,
        resizeMode: "cover",
      },
      commentContent: {
        flex: 1,
        marginHorizontal: 12,
      },
      commentUsername: {
        fontSize: 12,
        color: "#999",
      },
      commentContentText: {
        fontSize: 14,
        color: "#333",
        marginTop: 6,
      },
      commentContentDate: {
        fontSize: 10,
        color: "#bbb",
        paddingLeft: 12,
      },
      favoriteCount: {
        textAlign: "center",
        fontSize: 12,
        color: "#666",
        marginTop: 2,
      },
      line: {
        marginVertical: 12,
        height: StyleSheet.hairlineWidth,
        backgroundColor: "#eee",
      },
    });
    return (
      <>
        {/* 评论头部显示多少条评论 */}
        <Text style={styles.commentsCountTxt}>
          {article?.comments?.length
            ? `共 ${article?.comments?.length} 条评论`
            : "暂无评论"}
        </Text>
        {/* 评论输入框 */}
        <View style={styles.inputLayout}>
          <Image
            style={styles.userAvatar}
            source={{ uri: user?.avatar }}
          ></Image>
          <TextInput
            style={styles.inputStyle}
            placeholderTextColor="#bbb"
            placeholder="爱评论的人运气都不差~"
          ></TextInput>
        </View>

        {/* 评论列表 */}
        {article?.comments?.length !== 0 && (
          <View style={styles.commentsContainer}>
            {article?.comments?.map((item, index) => (
              <>
                <View
                  style={styles.commentItem}
                  key={`${item.dateTime}-${index}`}
                >
                  {/* 头像 */}
                  <Image
                    style={styles.avatarImage}
                    source={{ uri: item.avatarUrl }}
                  />
                  {/* 评论内容 */}
                  <View style={styles.commentContent}>
                    <Text style={styles.commentUsername}>{item.userName}</Text>
                    <Text style={styles.commentContentText}>
                      {item.message}
                      <Text style={styles.commentContentDate}>
                        {/* 使用dayjs处理日期格式 */}
                        &nbsp;{dayjs(item.dateTime).format("MM-DD")}{" "}
                        {item.location}
                      </Text>
                    </Text>
                    {/* 子评论 */}
                    {item.children?.length !== 0 &&
                      item.children?.map((item2, subIndex) => (
                        <>
                          <View
                            style={[
                              styles.commentItem,
                              {
                                marginTop:12,
                                width:screenWidth-75
                              },
                            ]}
                            key={`${item.dateTime}-${item2.dateTime}-${subIndex}`}
                          >
                            {/* 头像 */}
                            <Image
                              style={[
                                styles.avatarImage,
                                {
                                  width: 20,
                                  height: 20,
                                },
                              ]}
                              source={{ uri: item2.avatarUrl }}
                            />
                            {/* 评论内容 */}
                            <View
                              style={[
                                styles.commentContent,
                                {
                                  marginLeft: 5,
                                },
                              ]}
                            >
                              <Text style={styles.commentUsername}>
                                {item2.userName}
                              </Text>
                              <Text style={styles.commentContentText}>
                                {item2.message}
                                <Text style={styles.commentContentDate}>
                                  {/* 使用dayjs处理日期格式 */}
                                  &nbsp;{dayjs(item2.dateTime).format(
                                    "MM-DD"
                                  )}{" "}
                                  {item2.location}
                                </Text>
                              </Text>
                            </View>
                            {/* 爱心 */}
                            <View>
                              <Heart size={20} value={item2.isFavorite}></Heart>
                              <Text style={styles.favoriteCount}>
                                {item2.favoriteCount}
                              </Text>
                            </View>
                          </View>
                        </>
                      ))}
                  </View>
                  {/* 爱心 */}
                  <View>
                    <Heart size={20} value={item.isFavorite}></Heart>
                    <Text style={styles.favoriteCount}>
                      {item.favoriteCount}
                    </Text>
                  </View>
                </View>
                <View style={styles.line}></View>
              </>
            ))}
          </View>
        )}
      </>
    );
  };

  const renderBottom=()=>{
    return <View style={styles.bottomLayout}>
        <Image style={styles.icon_edit}  source={icon_edit}/>
        <TextInput
            style={styles.bottomInput}
            placeholderTextColor="#999"
            placeholder="说点什么吧~"
          ></TextInput>
          <Heart size={25} value={article?.isFavorite!}/>
          <Text style={styles.bottomCount}>{article?.favoriteCount}</Text>
          <Image style={styles.bottomImage} source={article?.isCollection ? icon_collection_selected:icon_collection} />
          <Text style={styles.bottomCount}>{article?.collectionCount}</Text>
          <Image style={styles.bottomImage} source={icon_comment}/>
          <Text style={styles.bottomCount}>{article?.comments?.length ?? 0}</Text>
    </View>
  }
  return (
    <>
      {article && (
        <View style={styles.root}>
          {renderTitle()}
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
          >
            {renderImages()}
            {renderInfo()}
            {renderComments()}
          </ScrollView>
          {renderBottom()}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  titleLayout: {
    width: "100%",
    flexDirection: "row",
    height: 56,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon_arrow: {
    width: 24,
    height: 24,
    resizeMode: "cover",
  },
  icon_share: {
    width: 24,
    height: 24,
    resizeMode: "cover",
    marginLeft: 10,
  },
  avatarImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    resizeMode: "cover",
    marginLeft: 10,
  },
  userTxt: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  favoriteButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#ff244270",
    justifyContent: "center",
    borderRadius: 14,
  },
  favoriteTxt: {
    color: "#ff2442",
    fontSize: 10,
  },
  scrollView: {},
  articleTitle: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
    paddingHorizontal: 16,
  },
  descTxt: {
    fontSize: 15,
    color: "#333",
    marginTop: 6,
    paddingHorizontal: 16,
  },
  tags: {
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#305090",
  },
  timeAndLocation: {
    fontSize: 12,
    color: "#bbb",
    marginVertical: 16,
    marginLeft: 16,
  },
  line: {
    marginHorizontal: 16,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#eee",
  },
  bottomLayout:{
    height:58,
    flexDirection:'row',
    paddingHorizontal:16,
    borderTopWidth:1,
    borderTopColor:"#eee",
    alignItems:'center'
  },
  bottomInput:{
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    flex:1,
    height: 40,
    marginHorizontal: 12,
    padding: 0,
    paddingHorizontal:12,
    paddingLeft:30,
    fontSize: 14,
    color:"#333"
  },
  bottomCount:{
    fontSize:14,
    color:'#333',
    fontWeight:'bold',
    marginLeft:6
  },
  bottomImage:{
    width:25,
    height:25,
    resizeMode:'cover',
    marginLeft:6
  },
  icon_edit:{
    position:'absolute',
    zIndex:99,
    width:20,
    height:20,
    resizeMode:'cover',
    left:35
  }
});
