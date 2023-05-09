import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, View, Image, Text } from "react-native";
import icon_daily from "../../../assets/icon_daily.png";
import icon_search from "../../../assets/icon_search.png";


type Props={
    tab?:number,
    onTabChange?:(tab:number)=>void
}

export const TitleBar = ({tab=1,onTabChange}:Props) => {
  const [index, setIndex] = useState(tab);


  return (
    <View style={styles.titleLayout}>
      <TouchableOpacity style={styles.dailyButton}>
        <Image style={styles.icon_style} source={icon_daily} />
      </TouchableOpacity>
      {/* 中间主体内容 */}
      <View style={styles.tabButton}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            setIndex(0);
            onTabChange?.(0)
          }}
        >
          <Text style={[index === 0 ? styles.tabTxtSelected : styles.tabTxt]}>
            关注
          </Text>
          {index === 0 && <View style={styles.line}></View>}
        </TouchableOpacity>
      </View>

      <View style={styles.tabButton}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            setIndex(1);
            onTabChange?.(1)
          }}
        >
          <Text style={[[index === 1 ? styles.tabTxtSelected : styles.tabTxt]]}>
            发现
          </Text>
          {index === 1 && <View style={styles.line}></View>}
        </TouchableOpacity>
      </View>

      <View style={styles.tabButton}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            setIndex(2);
            onTabChange?.(2)
          }}
        >
          <Text style={[[index === 2 ? styles.tabTxtSelected : styles.tabTxt]]}>
            郑州
          </Text>
          {index === 2 && <View style={styles.line}></View>}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.searchButton}>
        <Image style={styles.icon_style} source={icon_search} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  titleLayout: {
    width: "100%",
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  icon_style: {
    width: 28,
    height: 28,
    resizeMode: "cover",
  },

  dailyButton: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 12,
    marginRight: 42,
  },
  searchButton: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 12,
    marginLeft: 42,
  },
  line: {
    width: 28,
    height: 2,
    backgroundColor: "#ff2442",
    borderRadius: 1,
    position: "absolute",
    bottom: 6,
  },
  tabButton: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    position:'relative'
  },
  tabTxt: {
    fontSize: 16,
    color: "#999",
  },
  tabTxtSelected: {
    fontSize: 17,
    color: "#333",
  },
});
