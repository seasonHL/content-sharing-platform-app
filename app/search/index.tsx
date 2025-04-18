import PostCard from "@/components/home/PostCard";
import UserCard from "@/components/search/UserCard";
import ProductCard from "@/components/shop/ProductCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { search } from "@/service/search";
import { PostType, ProductType, User } from "@/types";
import { vw } from "@/utils";
import { useState } from "react";
import { View, Text, StyleSheet, ToastAndroid, FlatList } from "react-native";

export default function SearchPage() {
  const [user, setUser] = useState<User[]>([]);
  const [post, setPost] = useState<PostType[]>([]);
  const [product, setProduct] = useState<ProductType[]>([]);

  const searchHandler = (text: string) => {
    ToastAndroid.show("搜索", ToastAndroid.SHORT);
    search(text).then((res) => {
      const { user, post, product } = res;
      setUser(user);
      setPost(post);
      setProduct(product);
    });
  };
  return (
    <ThemedSafeAreaView style={styles.container}>
      {/* 搜索栏 */}
      <SearchBar onSearch={searchHandler} />
      {/* 展示 */}
      <View>
        <FlatList
          data={user}
          renderItem={({ item }) => <UserCard user={item} />}
          keyExtractor={(item) => item.user_id.toString()}
        />
        <FlatList
          data={post}
          renderItem={({ item }) => <PostCard post={item} resizeMode="cover" />}
          keyExtractor={(item) => item.post_id.toString()}
          numColumns={2}
        />
        <FlatList
          data={product}
          renderItem={({ item }) => (
            <ProductCard product={item} resizeMode="cover" />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      </View>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: vw(8),
  },
  grow: {
    flex: 1,
  },
});
