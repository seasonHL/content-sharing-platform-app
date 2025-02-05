import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { getPostDetail } from "@/service/post";
import { PostType, User } from "@/types";
import { omit } from "@/utils";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type PostPageParams = {
  postId: string;
};
export default function PostPage() {
  const params = useLocalSearchParams<PostPageParams>();
  const [post, setPost] = useState<PostType | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
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
    <ThemedSafeAreaView>
      {author ? (
        <ThemedView style={{ flexDirection: "row", alignContent: "center" }}>
          <Image source={{ uri: author.avatar }} style={styles.avatar} />
          <View style={{ justifyContent: "center" }}>
            <Text>{author.username}</Text>
          </View>
        </ThemedView>
      ) : null}
      {post ? (
        <ThemedView>
          <ThemedText>{post.title}</ThemedText>
          <View>
            {post.media.map((media) => (
              <Image
                key={media.media_url}
                source={{ uri: media.media_url }}
                style={styles.image}
              />
            ))}
          </View>
          <ThemedText>{post.content}</ThemedText>
        </ThemedView>
      ) : null}
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  image: {
    width: "100%",
    height: 320,
  },
});
