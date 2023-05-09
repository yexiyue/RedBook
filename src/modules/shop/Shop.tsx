import {
  Dimensions,
  FlatList,
  FlatListProps,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useShopStore } from "./useShopStore";
import { useEffect } from "react";
import { ResizeImage } from "../../component/ResizeImage";
import FlowList from "../../component/flowlist/FlowList";
import { GoodListHeader } from "./component/GoodHeader";
import { SearchHeader } from "./component/SearchHeader";

const { width } = Dimensions.get("screen");
export const Shop = () => {
  const [goodList, setPage, requestGoodList, refreshing] = useShopStore(
    (state) => [
      state.goodList,
      state.setPage,
      state.requestGoodList,
      state.refreshing,
    ]
  );
  useEffect(() => {
    requestGoodList();
  }, []);

  const renderItem: FlatListProps<typeof goodList[number]>["renderItem"] = ({
    item,
  }) => {
    const styles = StyleSheet.create({
      item: {
        width: (width - 18) >> 1,
        marginLeft: 6,
        backgroundColor: "white",
        marginBottom: 6,
				paddingBottom:10
      },
      titleTxt: {
        fontSize: 16,
        color: "#333",
        padding: 6,
      },
      prefix: {
        fontSize: 12,
        color: "#333",
        fontWeight: "bold",
				height:20
      },
      price: {
        color: "#333",
        fontWeight: "bold",
        fontSize: 18,
      },
      originPrice: {
        textDecorationLine: "line-through",
        fontSize: 16,
        color: "#666",
      },
			imageStyle:{
				width:"100%",
				height:200
			}
    });
    return (
      <View style={styles.item}>
        <Image style={styles.imageStyle} source={{ uri: item.image }} />
        <Text style={styles.titleTxt}>{item.title}</Text>
        {item.promotion && <Text>{item.promotion}</Text>}
        <Text style={styles.prefix}>
          ￥<Text style={styles.price}>{item.price}</Text>
          {item.originPrice && (
            <Text style={styles.prefix}>
              ￥<Text style={styles.originPrice}>{item.originPrice}</Text>
            </Text>
          )}
        </Text>
      </View>
    );
  };

	
  return (
    <View style={styles.root}>
			<SearchHeader></SearchHeader>

      <FlowList
        data={goodList}
        keyExtractor={(item:any) => `${item.id}`}
        renderItem={renderItem}
        numColumns={2}
        refreshing={refreshing}
        onRefresh={() => {
          setPage(1);
          requestGoodList();
        }}
        onEndReachedThreshold={0.1}
        onEndReached={requestGoodList}
				ListHeaderComponent={<GoodListHeader></GoodListHeader>}
				showsVerticalScrollIndicator={false}
      ></FlowList>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
		flex:1
	},
});
