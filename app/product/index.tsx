import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { getProduct } from "@/service/shop";
import { ProductType } from "@/types";
import { getImageSize, vw } from "@/utils";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  TouchableHighlight,
} from "react-native";

export default function ProductPage() {
  const params = useLocalSearchParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    if (product) {
      getImageSize(product.image).then((size) => {
        const aspectRatio = size.height / size.width;
        const maxHeight = aspectRatio * vw(414);
        setImageHeight(maxHeight);
      });
    }
  }, [product]);

  useEffect(() => {
    getProduct(Number(params.productId)).then((res) => {
      console.log(res.data);
      setProduct(res.data);
    });
  }, []);
  return (
    <ThemedSafeAreaView style={styles.grow}>
      <Image
        source={{ uri: product?.image }}
        style={{
          width: "100%",
          height: imageHeight,
        }}
      />
      <ScrollView style={styles.container}>
        {/* 价格 */}
        <Text style={styles.price}>￥{product?.price}</Text>
        {/* 标题 */}
        <Text style={styles.title}>{product?.name}</Text>
      </ScrollView>
      <View style={styles.bottomBar}>
        <View style={styles.action}>
          <TouchableHighlight style={styles.btnL}>
            <Text style={styles.btnTextL}>加入购物车</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.btnR}>
            <Text style={styles.btnTextR}>立即购买</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  grow: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: vw(8),
  },
  price: {
    fontSize: vw(24),
    fontWeight: "bold",
    color: "red",
  },
  title: {
    fontSize: vw(24),
    fontWeight: "bold",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: vw(8),
    paddingVertical: vw(8),
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ececec",
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    height: vw(40),
  },
  baseBtn: {},
  btnL: {
    paddingHorizontal: vw(16),
    paddingVertical: vw(8),
    borderTopLeftRadius: vw(20),
    borderBottomLeftRadius: vw(20),
    backgroundColor: "blue",
  },
  btnTextL: {
    color: "white",
  },
  btnR: {
    paddingHorizontal: vw(16),
    paddingVertical: vw(8),
    borderTopRightRadius: vw(20),
    borderBottomRightRadius: vw(20),
    backgroundColor: "red",
  },
  btnTextR: {
    color: "white",
  },
});
