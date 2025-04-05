import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import {
  createComment,
  getCommentList,
  getPostDetail,
  likePost,
  unlikePost,
} from "@/service/post";
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
  SectionList,
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
import { CommentEditor } from "./../../components/ui/CommentEditor";
import { useCommentStore, useUser } from "@/store";
import { BaseComment } from "@/components/ui/BaseComment";
import { commentAdapter, replyAdapter } from "@/store/post";
import { Toggle } from "@/components/ui/Toggle";

type PostPageParams = {
  postId: string;
};
export default function PostPage() {
  const params = useLocalSearchParams<PostPageParams>();
  const userStore = useUser();
  const commentStore = useCommentStore();
  const [post, setPost] = useState<PostType | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const router = useRouter();
  const [imageHeight, setImageHeight] = useState(0);
  const [show, setShow] = useState(false);

  const imageSizeList = useMemo(() => {
    return post?.media.map((media) => {
      return getImageSize(media.media_url);
    });
  }, [post?.media]);

  const handleLike = async () => {
    if (!post) return;
    try {
      const res = await likePost(post.post_id);
      setPost({
        ...post,
        isLiked: res.data.isLiked,
        likeCount: res.data.likeCount,
      });
    } catch (error) {}
  };

  const handleUnLike = async () => {
    if (!post) return;
    try {
      const res = await unlikePost(post.post_id);
      setPost({
        ...post,
        isLiked: res.data.isLiked,
        likeCount: res.data.likeCount,
      });
    } catch (error) {}
  };

  const sendComment = async (content: string) => {
    try {
      const comment = {
        comment_text: content,
        post_id: params.postId,
        parent_comment_id: commentStore.parentComment?.commentId,
        target_comment_id: commentStore.targetComment?.commentId,
        user_id: userStore.user!.user_id,
      };
      const res = await createComment(comment);
      if (res.data.parent_comment_id) {
        const cmt = {
          ...res.data,
          user: userStore.user!,
          target: commentStore.targetComment,
        };
        commentStore.addReply(res.data.parent_comment_id, replyAdapter(cmt));
      } else {
        const cmt = {
          ...res.data,
          user: userStore.user!,
        };
        commentStore.addComment(commentAdapter(cmt));
      }
      setShow(false);
      commentStore.setParentComment(null);
      commentStore.setTargetComment(null);
    } catch (error) {}
  };

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
        commentStore.addComment(res.data.map(commentAdapter));
      });
    }

    return () => {
      commentStore.reset();
    };
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
        <SectionList
          sections={[{ data: commentStore.comments, post }]}
          keyExtractor={(item) => item.commentId.toFixed()}
          renderItem={({ item }) => (
            <BaseComment
              key={item.commentId}
              comment={item}
              user={item.user}
              onReply={() => setShow(true)}
            />
          )}
          renderSectionHeader={({ section: { post } }) =>
            post ? (
              <>
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
                    <ThemedText style={styles.content}>
                      {post.content}
                    </ThemedText>
                    <ThemedText style={styles.time}>
                      {timestampToTime(post.created_at)}
                    </ThemedText>
                  </View>
                </ThemedView>
                <View style={styles.line}></View>
              </>
            ) : null
          }
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
          <Toggle
            isToggle={post?.isLiked}
            defaultComponent={
              <Pressable onPress={handleLike}>
                <AntDesign name="hearto" size={24} color="black" />
              </Pressable>
            }
            toggleComponent={
              <Pressable onPress={handleUnLike}>
                <AntDesign name="heart" size={24} color="red" />
              </Pressable>
            }
          />
          <Text>{post?.likeCount}</Text>
        </View>
      </ThemedSafeAreaView>
      <CommentEditor
        show={show}
        onCancel={() => setShow(false)}
        onSend={sendComment}
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
    flex: 1,
    resizeMode: "contain",
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
