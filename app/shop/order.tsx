import ProductCard from "@/components/shop/ProductCard";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { ProductType } from "@/types";
import { vw } from "@/utils";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { Button, FlatList, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderPage() {
  const params = useLocalSearchParams<{ products: string }>();
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const products = JSON.parse(params.products);
    setProducts(products);
  }, []);

  return (
    <>
      <ThemedSafeAreaView />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} type="list" />}
        keyExtractor={(item) => item.id.toFixed()}
      />
      <View style={styles.bottom}>
        <Button
          title={`下单并支付${products.reduce(
            (pre, cur) => pre + Number(cur.price),
            0
          )}元`}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bottom: {
    padding: vw(10),
  },
});
