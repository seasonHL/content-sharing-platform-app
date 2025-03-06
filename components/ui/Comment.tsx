import { CommentType } from "@/types/home";
import { timestampToTime } from "@/utils";
import { FC, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  Pressable,
  FlatList,
} from "react-native";
import { Toggle } from "./Toggle";
import { getReplyList } from "@/service/post";
import { Show } from "./Show";
interface Props {
  parentComment?: CommentType;
  comment: CommentType;
  user: {
    username: string;
    avatar: string;
  };
  replies?: CommentType[];
  isReply?: boolean;
  onReply?: (comment: CommentType) => void;
  onSubReply?: (parent: CommentType, comment: CommentType) => void;
}
export const Comment: FC<Props> = (props) => {
  const [replyList, setReplyList] = useState<CommentType[] | null>(null);
  const comment = useMemo(() => {
    return {
      commentId: props.comment.comment_id,
      content: props.comment.comment_text,
      createdAt: props.comment.created_at,
    };
  }, [props.comment]);
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: props.user.avatar }}
        style={props.isReply ? styles.replyAvatar : styles.avatar}
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontWeight: "bold" }}>{props.user.username}</Text>
        <Text>{comment.content}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "gray" }}>
            {timestampToTime(comment.createdAt)}
          </Text>
          <Pressable onPress={() => props.onReply?.(props.comment)}>
            <Text style={{ color: "gray" }}>回复</Text>
          </Pressable>
        </View>
        <Toggle
          isToggle={!!(replyList || props.isReply)}
          defaultComponent={
            <Show when={!!props.comment.replies?.length}>
              <Pressable
                onPress={() =>
                  getReplyList(comment.commentId).then((res) => {
                    setReplyList(res.data);
                  })
                }
              >
                <Text>展开</Text>
              </Pressable>
            </Show>
          }
          toggleComponent={
            <FlatList
              data={replyList}
              keyExtractor={(item) => item.comment_id.toFixed(0)}
              renderItem={({ item }) => (
                <SubComment
                  key={item.comment_id}
                  comment={item}
                  user={item.user}
                  isReply
                  parentComment={props.comment}
                  onSubReply={props.onSubReply}
                />
              )}
            />
          }
        />
      </View>
    </View>
  );
};

const SubComment: FC<
  Required<Pick<Props, "parentComment">> & Omit<Props, "parentComment">
> = (props) => {
  const comment = useMemo(() => {
    return {
      commentId: props.comment.comment_id,
      content: props.comment.comment_text,
      createdAt: props.comment.created_at,
    };
  }, [props.comment]);
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: props.user.avatar }}
        style={props.isReply ? styles.replyAvatar : styles.avatar}
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontWeight: "bold" }}>{props.user.username}</Text>
        <Text>{comment.content}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "gray" }}>
            {timestampToTime(comment.createdAt)}
          </Text>
          <Pressable
            onPress={() =>
              props.onSubReply?.(props.parentComment, props.comment)
            }
          >
            <Text style={{ color: "gray" }}>回复</Text>
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
});
