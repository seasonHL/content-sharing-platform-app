import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { addToCart, getProduct, getProductComments } from "@/service/shop";
import { ProductType } from "@/types";
import { getImageSize, vw } from "@/utils";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  TouchableHighlight,
  ToastAndroid,
  FlatList,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductComment } from "@/types/shop";

export default function ProductPage() {
  const params = useLocalSearchParams<{ productId: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [productComments, setProductComments] = useState<
    ProductComment[] | null
  >(null);
  const [imageHeight, setImageHeight] = useState(0);

  const handleAddToCart = async () => {
    try {
      if (product) {
        // 调用添加到购物车的函数
        await addToCart([product.id]);
        ToastAndroid.show("添加购物车成功", ToastAndroid.SHORT);
      }
    } catch (error) {}
  };

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
    getProductComments(Number(params.productId)).then((res) => {
      setProductComments(res.data);
    });
  }, []);
  return (
    <SafeAreaView style={styles.grow}>
      <Image
        source={{ uri: product?.image }}
        style={{
          width: "100%",
          height: imageHeight,
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          {/* 价格 */}
          <Text style={styles.price}>￥{product?.price}</Text>
          {/* 标题 */}
          <Text style={styles.title}>{product?.name}</Text>
          {/* 物流 */}
          <View style={[styles.tags]}>
            <Feather name="package" size={16} color="gray" />
            <Text style={[styles.gray]}>承诺48小时发货</Text>
          </View>
          {/* 权益 */}
          <View style={[styles.tags]}>
            <AntDesign name="Safety" size={16} color="gray" />
            <Text style={[styles.gray]}>退货包运费|假一赔十|7天无理由退货</Text>
          </View>
          {/* 标签 */}
          <View style={[styles.tags]}>
            <AntDesign name="tagso" size={16} color="gray" />
            <Text style={[styles.gray]}>重量|容量|充电速度</Text>
          </View>
        </View>
        {/* 评价 */}
        <View style={styles.section}>
          <View style={styles.commentList}>
            <Text style={styles.cmtTitle}>商品评价99</Text>
            {productComments?.map((item, index) => (
              <View style={styles.comment} key={index}>
                <View style={styles.commentCreator}>
                  <Image style={styles.avatar} source={{ uri: item.avatar }} />
                  <Text style={styles.username}>{item.username}</Text>
                </View>
                <Text>{item.content}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        {/* 购物车 */}
        <View style={styles.center}>
          <Feather
            name="shopping-cart"
            size={16}
            color="black"
            onPress={() => router.navigate("/cart")}
          />
          <Text style={styles.actionText}>购物车</Text>
        </View>
        {/* 客服消息 */}
        <View style={styles.center}>
          <AntDesign name="customerservice" size={16} color="black" />
          <Text style={styles.actionText}>客服</Text>
        </View>
        <View style={styles.action}>
          <TouchableHighlight style={styles.btnL} onPress={handleAddToCart}>
            <Text style={styles.btnTextL}>加入购物车</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.btnR}>
            <Text style={styles.btnTextR}>立即购买</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
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
  section: {
    paddingHorizontal: vw(8),
    backgroundColor: "#fff",
    borderRadius: vw(8),
    marginVertical: vw(6),
  },
  price: {
    fontSize: vw(32),
    fontWeight: "bold",
    color: "#ff5000",
    paddingVertical: vw(4),
  },
  title: {
    fontSize: vw(20),
    fontWeight: "bold",
    paddingVertical: vw(4),
  },
  bottomBar: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: vw(8),
    paddingVertical: vw(8),
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ececec",
    gap: vw(16),
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    height: vw(48),
  },
  baseBtn: {},
  btnL: {
    paddingHorizontal: vw(16),
    paddingVertical: vw(12),
    borderTopLeftRadius: vw(8),
    borderBottomLeftRadius: vw(8),
    backgroundColor: "#ff9402",
  },
  btnTextL: {
    color: "white",
    fontWeight: 600,
  },
  btnR: {
    paddingHorizontal: vw(16),
    paddingVertical: vw(12),
    borderTopRightRadius: vw(8),
    borderBottomRightRadius: vw(8),
    backgroundColor: "#ff5000",
  },
  btnTextR: {
    color: "white",
    fontWeight: 600,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  alignCenter: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  gray: {
    color: "gray",
  },
  tags: {
    flexDirection: "row",
    gap: vw(10),
    paddingVertical: vw(4),
  },
  actionText: {
    fontSize: vw(12),
  },
  commentList: {
    paddingVertical: vw(4),
  },
  cmtTitle: {
    fontSize: vw(20),
    paddingVertical: vw(4),
  },
  comment: {
    marginVertical: vw(4),
  },
  commentCreator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: vw(4),
  },
  avatar: {
    width: vw(16),
    height: vw(16),
    borderRadius: vw(8),
  },
  username: {
    marginHorizontal: vw(4),
    color: "gray",
  },
});
