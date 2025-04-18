import { PostType } from "@/types";
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
  post: PostType;
  resizeMode?: "cover" | "contain" | "stretch" | "center";
}
const PostCard: FC<Props> = ({ post, resizeMode }) => {
  const router = useRouter();
  const [aspectRatio, setAspectRatio] = useState(1);

  const onImageLoad = (event: NativeSyntheticEvent<ImageLoadEventData>) => {
    const { width, height } = event.nativeEvent.source;
    setAspectRatio(width / height);
  };

  const postEntry = useMemo(() => {
    return {
      cover: post.media?.[0]?.media_url,
      title: post.title,
      description: post.content,
    };
  }, [post]);

  const onPress = () => {
    router.push({
      pathname: "/post",
      params: {
        postId: post.post_id,
      },
    });
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <ThemedView style={styles.card}>
        <Image
          source={{ uri: postEntry.cover }}
          style={[
            styles.cover,
            resizeMode ? { resizeMode, height: vw(180) } : { aspectRatio },
          ]}
          onLoad={onImageLoad}
        />
        <ThemedView style={styles.content}>
          <ThemedText style={styles.title}>{postEntry.title}</ThemedText>
          <ThemedText style={styles.description}>
            {postEntry.description}
          </ThemedText>
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
    width: vw(204),
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
});

export default memo(PostCard);
