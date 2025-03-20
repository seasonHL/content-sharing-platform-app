import { Button, FlatList, StyleSheet, View } from "react-native";
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

export default function ExploreScreen() {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      getProductList().then((res) => {
        if (!res.data) {
          return;
        }
        setProductList(res.data);
      });
    }, [])
  );
  return (
    <>
      <ThemedSafeAreaView style={styles.header}>
        <SearchBar left={null} />
      </ThemedSafeAreaView>
      <View style={styles.toolBar}>
        {/* 购物车 */}
        <Feather
          name="shopping-cart"
          size={24}
          color="black"
          onPress={() => router.navigate("/cart")}
        />
        <Feather name="shopping-bag" size={24} color="black" />
      </View>
      <WaterFallList
        data={productList}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toFixed()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: vw(8),
  },
  toolBar: {
    backgroundColor: "white",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: vw(16),
    paddingHorizontal: vw(16),
    borderRadius: 8,
    marginVertical: vw(8),
  },
});
