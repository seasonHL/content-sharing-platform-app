import { Button, FlatList, StyleSheet } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { SearchBar } from "@/components/ui/SearchBar";
import { useCallback, useState } from "react";
import { getProductList } from "@/service/shop";
import { ProductType } from "@/types";
import WaterFallList from "@/components/ui/WaterFallList";
import ProductCard from "@/components/shop/ProductCard";

export default function ExploreScreen() {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      getProductList().then((res) => {
        setProductList(res.data);
      });
    }, [])
  );
  return (
    <ThemedSafeAreaView>
      <SearchBar left={null} />
      <WaterFallList
        data={productList}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toFixed()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({});
