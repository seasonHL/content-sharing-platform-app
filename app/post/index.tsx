import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { createComment, getCommentList, getPostDetail } from "@/service/post";
import { PostType, User } from "@/types";
import { getImageSize, omit, timestampToTime, vw } from "@/utils";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { CommentType } from "@/types/home";
import { Comment } from "@/components/ui/Comment";
import { Show } from "@/components/ui/Show";
import { CommentEditor } from "./../../components/ui/CommentEditor";
import { useUser } from "@/store";

type PostPageParams = {
  postId: string;
};
export default function PostPage() {
  const params = useLocalSearchParams<PostPageParams>();
  const userStore = useUser();
  const [post, setPost] = useState<PostType | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const router = useRouter();
  const [imageHeight, setImageHeight] = useState(0);
  const [commentList, setCommentList] = useState<CommentType[] | null>(null);
  const [show, setShow] = useState(false);
  const [selectedComment, setSelectedComment] = useState<CommentType | null>(
    null
  );

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
          setPost(omit(res, ["author"]) as PostType);
          setAuthor(res.author);
        })
        .catch((err) => {
          console.log(err);
        });

      getCommentList(params.postId).then((res) => {
        setCommentList(res.data);
      });
    }
  }, []);
  return (
    <>
      <ThemedSafeAreaView style={styles.container}>
        {author ? (
          <ThemedView style={styles.top}>
            <AntDesign
              name="left"
              size={24}
              color="gray"
              onPress={router.back}
            />
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
        <FlatList
          data={commentList}
          keyExtractor={(item) => item.comment_id.toFixed()}
          renderItem={({ item }) => (
            <Comment
              key={item.comment_id}
              comment={item}
              user={item.user}
              replies={[]}
              onReply={(comment) => {
                setSelectedComment(comment);
                setShow(true);
              }}
              onSubReply={(parent, comment) => {
                setSelectedComment(parent);
                setShow(true);
              }}
            />
          )}
        />
        <View style={styles.bottomBar}>
          <Pressable
            onPress={() => {
              setShow(true);
            }}
          >
            <View style={styles.commentBar}>
              <Text>评论</Text>
            </View>
          </Pressable>
        </View>
      </ThemedSafeAreaView>
      <CommentEditor
        show={show}
        onCancel={() => setShow(false)}
        onSend={(content) => {
          createComment({
            comment_text: content,
            post_id: params.postId,
            parent_comment_id: selectedComment?.comment_id,
            user_id: userStore.user!.user_id,
          })
            .then((res) => {
              setShow(false);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      />
    </>
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
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: vw(8),
    paddingHorizontal: vw(8),
  },
  commentBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: vw(8),
    paddingHorizontal: vw(12),
    width: vw(270),
    height: vw(36),
    borderRadius: vw(18),
    backgroundColor: "#ececec",
  },
});
