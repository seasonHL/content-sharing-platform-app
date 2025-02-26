import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { getPostDetail } from "@/service/post";
import { PostType, User } from "@/types";
import { getImageSize, omit, timestampToTime, vw } from "@/utils";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type PostPageParams = {
  postId: string;
};
export default function PostPage() {
  const params = useLocalSearchParams<PostPageParams>();
  const [post, setPost] = useState<PostType | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const router = useRouter();
  const [imageHeight, setImageHeight] = useState(0);
  const imageSizeList = useMemo(() => {
    return post?.media.map((media) => {
      return getImageSize(media.media_url);
    });
  }, [post?.media]);

  useEffect(() => {
    if (imageSizeList) {
      Promise.all(imageSizeList)
        .then((res) => {
          const aspectRatio = res.map((size) => size.height / size.width);
          const maxHeight = Math.max(...aspectRatio) * vw(414);
          setImageHeight(maxHeight);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [imageSizeList]);

  useEffect(() => {
    if (post) {
      // do something with post
    } else {
      getPostDetail(params.postId)
        .then((res) => {
          console.log(res);
          setPost(omit(res, ["author"]) as PostType);
          setAuthor(res.author);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return (
    <ThemedSafeAreaView style={styles.container}>
      {author ? (
        <ThemedView style={styles.top}>
          <AntDesign name="left" size={24} color="gray" onPress={router.back} />
          <Image source={{ uri: author.avatar }} style={styles.avatar} />
          <Text>{author.username}</Text>
        </ThemedView>
      ) : null}
      {post ? (
        <ThemedView>
          <PagerView
            initialPage={0}
            style={{
              height: imageHeight,
            }}
          >
            {post.media.map((media) => (
              <Image
                key={media.media_url}
                source={{ uri: media.media_url }}
                style={styles.image}
              />
            ))}
          </PagerView>
          <View style={[styles.pd8]}>
            <ThemedText style={styles.title}>{post.title}</ThemedText>
            <ThemedText style={styles.content}>{post.content}</ThemedText>
            <ThemedText style={styles.time}>
              {timestampToTime(post.created_at)}
            </ThemedText>
          </View>
        </ThemedView>
      ) : null}
      <View style={styles.line}></View>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: vw(8),
    paddingHorizontal: vw(8),
  },
  avatar: {
    width: vw(48),
    height: vw(48),
    borderRadius: vw(24),
    marginHorizontal: vw(8),
  },
  image: {
    width: "100%",
    height: vw(320),
  },
  title: {
    fontSize: vw(18),
  },
  content: {
    fontSize: vw(16),
  },
  time: {
    fontSize: vw(14),
    color: "gray",
  },
  pd8: {
    padding: vw(8),
  },
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#ececec",
    margin: vw(8),
  },
});
