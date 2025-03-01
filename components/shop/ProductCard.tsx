import { ProductType } from "@/types";
import { FC, memo, useMemo, useState } from "react";
import { ThemedView } from "../ui/ThemedView";
import {
  Image,
  ImageLoadEventData,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "../ui/ThemedText";
import { useRouter } from "expo-router";
import { vw } from "@/utils";

interface Props {
  product: ProductType;
}
const ProductCard: FC<Props> = ({ product }) => {
  const router = useRouter();
  const [aspectRatio, setAspectRatio] = useState(1);

  const onImageLoad = (event: NativeSyntheticEvent<ImageLoadEventData>) => {
    const { width, height } = event.nativeEvent.source;
    setAspectRatio(width / height);
  };

  const productEntry = useMemo(() => {
    return {
      cover: product.image,
      title: product.name,
      description: product.description,
    };
  }, [product]);

  const onPress = () => {
    router.push({
      pathname: "/product",
      params: {
        productId: product.id,
      },
    });
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <ThemedView style={styles.card}>
        <Image
          source={{ uri: productEntry.cover }}
          style={[styles.cover, { aspectRatio }]}
          onLoad={onImageLoad}
        />
        <ThemedView style={styles.content}>
          <ThemedText style={styles.title}>{productEntry.title}</ThemedText>
          <ThemedText style={styles.description}>
            {productEntry.description}
          </ThemedText>
          <ThemedText style={styles.price}>￥{product.price}</ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  card: {
    width: vw(204),
    margin: vw(2),
    borderRadius: vw(4),
    overflow: "hidden",
  },
  cover: {
    width: vw(206),
  },
  content: {
    padding: vw(4),
  },
  title: {
    fontSize: vw(18),
    fontWeight: "bold",
  },
  description: {
    fontSize: vw(14),
    color: "gray",
  },
  price: {
    fontSize: vw(16),
    fontWeight: "bold",
  },
});

export default memo(ProductCard);
