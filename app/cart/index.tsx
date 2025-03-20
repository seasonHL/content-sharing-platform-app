import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { getCart } from "@/service/shop";
import { ProductType } from "@/types";
import { vw } from "@/utils";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

export default function CartPage() {
  // const param = useLocalSearchParams<{ cartId: string }>();
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    getCart().then((res) => {
      if (!res.data) {
        return;
      }
      router.setParams({
        cartId: res.data.id,
      });
      setProducts(res.data.products);
    });
  }, []);
  return (
    <>
      <ThemedSafeAreaView></ThemedSafeAreaView>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image style={styles.cover} source={{ uri: item.image }} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toFixed()}
        style={styles.listWrapper}
      />
      {products.length === 0 && <Text>购物车为空</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  listWrapper: {
    padding: vw(10),
    gap: vw(10),
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: vw(10),
    marginBottom: vw(10),
    backgroundColor: "#fff",
    borderRadius: vw(4),
  },
  cover: {
    width: vw(64),
    height: vw(64),
    marginRight: vw(10),
    borderRadius: vw(4),
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: vw(18),
    fontWeight: "bold",
  },
  description: {
    fontSize: vw(14),
    color: "gray",
  },
});
