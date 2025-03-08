import { timestampToTime, vw } from "@/utils";
import React, { useEffect, useMemo } from "react";
import {
  View,
  Pressable,
  Image,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { Toggle } from "./Toggle";
import { Show } from "./Show";
import { useCommentStore } from "@/store";
import { commentAdapter, replyAdapter, TCommentState } from "@/store/post";
import { getReplyList } from "@/service/post";

interface BaseCommentProps {
  comment: TCommentState;
  user: {
    username: string;
    avatar: string;
  };
  onReply?: () => void;
}

export const BaseComment = ({ comment, user, onReply }: BaseCommentProps) => {
  const commentStore = useCommentStore();
  const replies = useMemo(() => {
    const cur = commentStore.comments.find(
      (item) => item.commentId === comment.commentId
    );
    if (cur) {
      return cur.replies ?? [];
    }
    return [];
  }, [commentStore.comments]);
  async function expand() {
    const res = await getReplyList(comment.commentId);
    commentStore.addReply(comment.commentId, res.data.map(replyAdapter));
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <View style={styles.ml10}>
        <Text style={{ fontWeight: "bold" }}>{user.username}</Text>
        <Text>{comment.content}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.gray}>{timestampToTime(comment.createdAt)}</Text>
          <Pressable
            onPress={() => {
              commentStore.setParentComment(comment);
              commentStore.setTargetComment(comment);
              onReply?.();
            }}
          >
            <Text style={styles.gray}>回复</Text>
          </Pressable>
        </View>
        {/* 二级评论 */}
        <Toggle
          isToggle={replies.length}
          defaultComponent={
            <Show when={!replies.length && comment.replyCount}>
              <Pressable onPress={expand}>
                <Text>展开</Text>
              </Pressable>
            </Show>
          }
          toggleComponent={
            <FlatList
              data={replies}
              keyExtractor={(item) => item.commentId.toFixed(0)}
              renderItem={({ item }) => (
                <SubComment
                  key={item.commentId}
                  comment={item}
                  user={item.user}
                  parentComment={comment}
                  onReply={onReply}
                />
              )}
            />
          }
        />
      </View>
    </View>
  );
};

interface SubCommentProps extends BaseCommentProps {
  parentComment: BaseCommentProps["comment"];
}

export const SubComment = ({
  parentComment,
  comment,
  user,
  onReply,
}: SubCommentProps) => {
  const commentStore = useCommentStore();
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.replyAvatar} />
      <View style={styles.ml10}>
        <Text style={{ fontWeight: "bold" }}>
          {user.username}
          <Show
            when={
              comment.target &&
              parentComment.commentId != comment.target.commentId
            }
          >
            <Text style={styles.gray}> 回复 </Text>
            <Text>{comment.target?.user.username}</Text>
          </Show>
        </Text>
        <Text>{comment.content}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.gray}>{timestampToTime(comment.createdAt)}</Text>
          <Pressable
            onPress={() => {
              commentStore.setParentComment(parentComment);
              commentStore.setTargetComment(comment);
              onReply?.();
            }}
          >
            <Text style={styles.gray}>回复</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  replyAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  ml10: {
    marginLeft: vw(10),
  },
  gray: {
    color: "gray",
  },
});
