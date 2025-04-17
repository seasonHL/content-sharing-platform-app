import { StyleSheet, FlatList, View, RefreshControl } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { getPostList } from "@/service/home";
import { PostType } from "@/types";
import PostCard from "@/components/home/PostCard";
import HomePageHeader from "@/components/home/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import WaterFallList from "@/components/ui/WaterFallList";
import { useFocusEffect } from "expo-router";
import useRequest from "@/hooks/useRequest";

export default function HomeScreen() {
  const [postList, setPostList] = useState<PostType[]>([]);
  const rPost = useRequest(getPostList, {
    onSuccess: (res) => setPostList(res.data),
  });

  return (
    <>
      <HomePageHeader />
      <WaterFallList
        refreshControl={
          <RefreshControl
            refreshing={rPost.loading}
            onRefresh={rPost.refetch}
          />
        }
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
