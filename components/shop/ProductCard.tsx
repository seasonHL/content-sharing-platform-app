import { ProductType } from "@/types";
import { FC, memo, useMemo, useState } from "react";
import { ThemedView } from "../ui/ThemedView";
import {
  Image,
  ImageLoadEventData,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { ThemedText } from "../ui/ThemedText";
import { useRouter } from "expo-router";
import { vw } from "@/utils";
import Checkbox from "expo-checkbox";

interface ProductLike extends ProductType {
  selected?: boolean;
}

interface Props {
  product: ProductLike;
  type?: "list" | "grid";
  withCheck?: boolean;
  resizeMode?: "contain" | "cover" | "stretch" | "center";
  onPress?: () => void;
}
const ProductCard: FC<Props> = ({
  product,
  type,
  withCheck,
  resizeMode,
  onPress,
}) => {
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

  const pressHandler = onPress
    ? onPress
    : () => {
        router.push({
          pathname: "/product",
          params: {
            productId: product.id,
          },
        });
      };

  const renderList = () => {
    return (
      <View style={styles.listItem}>
        {withCheck && <Checkbox value={product.selected} color={"gray"} />}
        <Image style={styles.lCover} source={{ uri: product.image }} />
        <View style={styles.lInfo}>
          <Text style={styles.lName}>{product.name}</Text>
          <Text style={styles.lDescription}>{product.description}</Text>
          <Text style={styles.lPrice}>￥{product.price}</Text>
        </View>
      </View>
    );
  };

  const renderGrid = () => {
    return (
      <ThemedView style={styles.card}>
        <Image
          source={{ uri: productEntry.cover }}
          style={[
            styles.cover,
            resizeMode ? { resizeMode, height: vw(180) } : { aspectRatio },
          ]}
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
    );
  };
  return (
    <TouchableOpacity onPress={pressHandler} style={styles.container}>
      {type === "list" ? renderList() : renderGrid()}
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
    color: "red",
  },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: vw(10),
    marginBottom: vw(10),
    backgroundColor: "#fff",
    borderRadius: vw(4),
  },
  lCover: {
    width: vw(64),
    height: vw(64),
    marginHorizontal: vw(10),
    borderRadius: vw(4),
  },
  lInfo: {
    flex: 1,
  },
  lName: {
    fontSize: vw(18),
    fontWeight: "bold",
  },
  lDescription: {
    fontSize: vw(14),
    color: "gray",
  },
  lPrice: {
    fontSize: vw(16),
    fontWeight: "bold",
    color: "red",
  },
});

export default memo(ProductCard);
