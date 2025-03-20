import { useSocket } from "@/hooks/useSocket";
import { getConversationDetail } from "@/service/message";
import { useUser } from "@/store";
import { ConversationType, MessageType } from "@/types/message";
import { vw } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ChatPageParams = {
  conversationId: string;
};
export default function ChatPage() {
  const params = useLocalSearchParams<ChatPageParams>();
  const [messageList, setMessageList] = useState<MessageType[]>([]);
  const [text, setText] = useState("");
  const [conversationDetail, setConversationDetail] =
    useState<ConversationType | null>(null);
  const userStore = useUser();
  const socket = useSocket(
    useMemo(
      () => ({
        onMessage: (msg: MessageType) => {
          setMessageList((prev) => {
            return [...prev, msg];
          });
        },
      }),
      [setMessageList]
    )
  );

  const sendMessage = () => {
    if (!conversationDetail) return;
    const msg = {
      content: text,
      receiver_id: conversationDetail.friend_id,
      conversation_id: conversationDetail.conversation_id,
    } as MessageType;
    socket.emit("message", msg);
    setText("");
    setMessageList((prev) => {
      return [...prev, msg];
    });
  };

  useEffect(() => {
    getConversationDetail(Number(params.conversationId)).then((res) => {
      setConversationDetail(res);
      setMessageList(res.messages);
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.grow}>
        <FlatList
          data={messageList}
          renderItem={({ item }) => {
            const isMe = item.receiver_id !== conversationDetail?.user_id;
            return (
              <View
                style={[
                  {
                    flexDirection: isMe ? "row-reverse" : "row",
                  },
                  styles.alignCenter,
                ]}
              >
                <Image
                  style={styles.avatar}
                  source={{
                    uri: isMe
                      ? userStore.user?.avatar
                      : conversationDetail.avatar,
                  }}
                />

                <Text
                  style={[styles.msg, isMe ? styles.myMsg : styles.otherMsg]}
                >
                  {item.content}
                </Text>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.ipt}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
        />
        {/* <Ionicons name="send" size={16} color="gray" /> */}
        <Button title="发送" onPress={sendMessage} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: vw(10),
    paddingVertical: vw(10),
    height: "100%",
  },
  ipt: {
    flexDirection: "row",
    gap: vw(10),
  },
  textInput: {
    flex: 1,
    backgroundColor: "white",
  },
  sendButton: {
    height: vw(20),
  },
  grow: {
    flex: 1,
  },
  msg: {
    borderRadius: vw(10),
    padding: vw(10),
    margin: vw(10),
    maxWidth: vw(320),
  },
  myMsg: {
    color: "white",
    backgroundColor: "blue",
  },
  otherMsg: {
    color: "white",
    backgroundColor: "gray",
  },
  avatar: {
    width: vw(40),
    height: vw(40),
    borderRadius: vw(20),
  },
  alignCenter: {
    alignItems: "center",
  },
});
