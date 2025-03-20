import { StyleSheet, FlatList, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { getPostList } from "@/service/home";
import { PostType } from "@/types";
import PostCard from "@/components/home/PostCard";
import HomePageHeader from "@/components/home/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import WaterFallList from "@/components/ui/WaterFallList";
import { useFocusEffect } from "expo-router";

export default function HomeScreen() {
  const [postList, setPostList] = useState<PostType[]>([]);

  useFocusEffect(
    useCallback(() => {
      getPostList().then((res) => {
        if (!res) {
          return;
        }
        setPostList(res);
      });
    }, [])
  );

  return (
    <>
      <HomePageHeader />
      <WaterFallList
        data={postList}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.post_id.toFixed()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}

const styles = StyleSheet.create({});
