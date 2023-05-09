import { PropsWithChildren, useEffect, useRef, useState } from "react";
import {
  FlatListProps,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { request } from "../../utils/request";
import { useMessageStore } from "./useMessageStore";
import icon_group from "../../assets/icon_group.png";
import { FlatList } from "react-native-gesture-handler";

import icon_star from '../../assets/icon_star.png'
import icon_new_flower from '../../assets/icon_new_follow.png'
import icon_comments from '../../assets/icon_comments.png'
import icon_toTop from '../../assets/icon_to_top.png'
import { FloatModal, FloatModalRef } from "./FloatModal";
export const Message = () => {
  const [unread, setUnread] = useState<UnRead>();
  const [refreshing, messageList, requestMessageList] = useMessageStore(
    (state) => [state.refreshing, state.messageList, state.requestMessageList]
  );

  const modalRef=useRef<FloatModalRef>(null)
  useEffect(() => {
    request("unread").then((res) => {
      setUnread(res.data);
    });
    requestMessageList();
  }, []);

  const renderTitle = () => {
    const styles = StyleSheet.create({
      header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 48,
        backgroundColor: "white",
      },
      button: {
        position: "absolute",
        flexDirection: "row",
        alignItems: "center",
        right: 16,
        height:'100%'
      },
      image: {
        width: 16,
        height: 16,
      },
      title: {
        fontSize: 16,
        color: "#333",
        fontWeight: "bold",
      },
      group: {
        fontSize: 12,
        color: "#333",
        marginLeft: 6,
      },
    });
    return (
      <View style={styles.header}>
        <Text style={styles.title}>消息</Text>
        <Pressable onPress={(event)=>{
            const {pageX,pageY}=event.nativeEvent
            modalRef.current?.show(pageY)
        }} style={styles.button}>
          <Image style={styles.image} source={icon_group} />
          <Text style={styles.group}>群聊</Text>
        </Pressable>
      </View>
    );
  };

  const renderItem: FlatListProps<MessageListItem>["renderItem"] = ({
    item,
  }) => {
    const styles=StyleSheet.create({
        listItem:{
            flexDirection:'row',
            alignItems:'center',
            marginHorizontal:12,
            paddingHorizontal:10,
            height:80
        },
        avatarImage:{
            width:48,
            height:48,
            resizeMode:'cover',
            borderRadius:25
        },
        content:{
            flex:1,
            marginHorizontal:12,
        },
        name:{
            fontSize:16,
            color:'#333',
            fontWeight:'bold'
        },
        lastMessage:{   
            fontSize:14,
            color:'#999',
            marginTop:4
        },
        lastMessageTime:{
            fontSize:12,
            color:'#999'
        },
        icon_toTop:{
            width:8,
            resizeMode:'contain'
        },
        timeBox:{
            alignItems:'flex-end'
        }
    })
    return (
      <View style={styles.listItem}>
        <Image style={styles.avatarImage} source={{uri:item.avatarUrl}} />
        <View style={styles.content}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.lastMessage}>{item.lastMessage}</Text>
        </View>
        <View style={styles.timeBox}>
            <Text style={styles.lastMessageTime}>{item.lastMessageTime}</Text>
            <Image style={styles.icon_toTop} source={icon_toTop}/>
        </View>
      </View>
    );
  };

  const UnRead=({count,children}:{count?:number}&PropsWithChildren)=>{
    const styles=StyleSheet.create({
        text:{
           position:'absolute',
           backgroundColor:'#ff2442',
           top:-6,
           right:-12,
           paddingHorizontal:8,
           height:24,
           borderRadius:12,
           fontSize:12,
           color:"white",
           textAlignVertical:'center'
        },
        root:{

        }
    })
    return <View style={styles.root}>
        {children}
        {!!count && <Text style={styles.text}>{count>99?'99+':count}</Text>}
    </View>
  }

  const MessageHeader = () => {
    const styles = StyleSheet.create({
        headerLayout:{
            paddingHorizontal:16,
            flexDirection:'row',
            justifyContent:'space-around',
            marginVertical:15
        },
        item:{
            justifyContent:'center',
            alignItems:'center'
        },
        image:{
            height:48,
            width:48
        },
        txt:{
            fontSize:14,
            fontWeight:'bold',
            marginTop:10,
            color:'#333'
        }
    });
    return (
      <View style={styles.headerLayout}>
        <View style={styles.item}>
            <UnRead count={unread?.unreadFavorate}>
                <Image style={styles.image} source={icon_star}/>
            </UnRead>
            <Text style={styles.txt}>赞和收藏</Text>
        </View>
        <View style={styles.item}>
            <UnRead count={unread?.newFollow}>
                <Image style={styles.image} source={icon_new_flower}/>
            </UnRead>
            <Text style={styles.txt}>新增关注</Text>
        </View>
        <View style={styles.item}>
            <UnRead count={unread?.comment} >
                <Image style={styles.image} source={icon_comments}/>
            </UnRead>
            <Text style={styles.txt}>评论和@</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.root}>
      {renderTitle()}
      <FlatList
        data={messageList}
        ListHeaderComponent={<MessageHeader></MessageHeader>}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        refreshing={refreshing}
        extraData={unread}
        onEndReachedThreshold={0.1}
        onEndReached={requestMessageList}
        showsVerticalScrollIndicator={false}
        onRefresh={() => {
          useMessageStore.setState({ page: 1 });
          requestMessageList();
          console.log(1111)
        }}
      />
      <FloatModal ref={modalRef}/>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:'white'
  },
});
