import { useEffect, useState } from "react";
import { Dimensions, Image, ImageProps, StyleSheet } from "react-native";

type Props = ImageProps
const { width } = Dimensions.get("screen");
const showWidth = (width - 18) >> 1;

export const ResizeImage = ({ source, style }: Props) => {
  const [height, setHeight] = useState(200);

  useEffect(() => {
    //获取图片宽高，根据原图片宽高比设置对应的高度
    Image.getSize((source as any).uri, (width, height) => {
      setHeight((height / width) * showWidth);
    });
  }, []);
  return (
    <Image
      source={source}

      style={[
        style,
        {
          width: showWidth,
          height,
          resizeMode:'cover'
        },
      ]}
    />
  );
};

