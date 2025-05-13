import { Button, FlatList, StyleSheet, View, Text } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { SearchBar } from "@/components/ui/SearchBar";
import { useCallback, useState } from "react";
import { getProductList } from "@/service/shop";
import { ProductType } from "@/types";
import WaterFallList from "@/components/ui/WaterFallList";
import ProductCard from "@/components/shop/ProductCard";
import { vw } from "@/utils";
import { AntDesign, Feather } from "@expo/vector-icons";
import useRequest from "@/hooks/useRequest";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const router = useRouter();

  useRequest(getProductList, {
    onSuccess: (res) => setProductList(res.data),
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SearchBar left={null} />
      </View>
      <View style={styles.toolBar}>
        {/* 我的订单 */}
        <View style={styles.tool} >
          <Feather name="shopping-bag" size={24} color="black" />
          <Text>我的订单</Text>
        </View>
        {/* 购物车 */}
        <View style={styles.tool} >
          <Feather
            name="shopping-cart"
            size={24}
            color="black"
            onPress={() => router.navigate("/cart")}
          />
          <Text>购物车</Text>
        </View>
        {/* 客服消息 */}
        <View style={styles.tool} >
          <AntDesign name="customerservice" size={24} color="black" />
          <Text>客服消息</Text>
        </View>
        {/* 浏览历史 */}
        <View style={styles.tool} >
          <Feather name="clock" size={24} color="black" />
          <Text>浏览历史</Text>
        </View>
        {/* 地址管理 */}
        <View style={styles.tool} >
          <AntDesign name="enviromento" size={24} color="black" />
          <Text>地址管理</Text>
        </View>
      </View>
      <WaterFallList
        data={productList}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toFixed()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "white",
    height: '100%'
  },
  header: {
    paddingHorizontal: vw(8),
  },
  toolBar: {
    backgroundColor: "white",
    // height: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: vw(16),
    paddingHorizontal: vw(16),
    paddingVertical: vw(8),
    borderRadius: 8,
    marginVertical: vw(8),
  },
  tool:{
    alignItems: 'center'
  }
});
