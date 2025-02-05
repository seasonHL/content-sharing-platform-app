import { StyleSheet, FlatList, View } from "react-native";
import { useEffect, useState } from "react";
import { getPostList } from "@/service/home";
import { PostType } from "@/types";
import PostCard from "@/components/home/PostCard";
import HomePageHeader from "@/components/home/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import WaterFallList from "@/components/ui/WaterFallList";

export default function HomeScreen() {
  const [postList, setPostList] = useState<PostType[]>([]);
  useEffect(() => {
    getPostList().then((res) => {
      setPostList(res);
    });
  }, []);
  return (
    <View>
      <HomePageHeader />
      <WaterFallList
        data={postList}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.post_id.toFixed()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    margin: "auto",
  },
});
