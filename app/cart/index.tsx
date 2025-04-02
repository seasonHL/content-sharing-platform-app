import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { getCart } from "@/service/shop";
import { ProductType } from "@/types";
import { vw } from "@/utils";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  Button,
  Alert,
} from "react-native";
import Checkbox from "expo-checkbox";
import ProductCard from "@/components/shop/ProductCard";

export default function CartPage() {
  // const param = useLocalSearchParams<{ cartId: string }>();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cartProducts, setCartProducts] = useState<
    (ProductType & { selected: boolean })[]
  >([]);

  const handleCheck = (product: ProductType) => {
    console.log("click", product);
    setCartProducts((pre) =>
      pre.map((item) => ({
        ...item,
        selected: item.id === product.id ? !item.selected : item.selected,
      }))
    );
  };

  /**
   * @todo 服务端删除
   * @returns
   */
  const handleRemove = () => {
    Alert.alert("移除", "是否移除选中的商品", [
      {
        text: "取消",
        style: "cancel",
      },
      {
        text: "确定",
        onPress: () => {
          setCartProducts((pre) =>
            pre.filter((item) => {
              return !item.selected;
            })
          );
        },
      },
    ]);
  };

  const handlePay = () => {
    Alert.alert("支付", "是否支付选中的商品", [
      {
        text: "取消",
        style: "cancel",
      },
      {
        text: "确定",
        onPress: () => {
          router.push({
            pathname: "/shop/order",
            params: {
              products: JSON.stringify(
                cartProducts.filter((item) => item.selected)
              ),
            },
          });
        },
      },
    ]);
  };

  useEffect(() => {
    setCartProducts(
      products.map((product) => {
        return {
          ...product,
          selected: false,
        };
      })
    );
  }, [products]);
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
        data={cartProducts}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            type="list"
            withCheck={true}
            onPress={() => handleCheck(item)}
          />
        )}
        keyExtractor={(item) => item.id.toFixed()}
        style={styles.listWrapper}
      />
      {products.length === 0 && <Text>购物车为空</Text>}

      <View style={styles.bottom}>
        <Text>
          总价：￥
          {cartProducts
            .filter((item) => item.selected)
            .reduce((pre, cur) => pre + Number(cur.price), 0)}
        </Text>
        <View style={{ flexDirection: "row", gap: 4 }}>
          <Button title="结算" color={"red"} onPress={handlePay} />
          <Button title="移除" color={"gray"} onPress={handleRemove} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  listWrapper: {
    padding: vw(10),
    gap: vw(10),
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: vw(10),
  },
});
