import { socket } from "@/service";
import { getConversationDetail } from "@/service/message";
import { ConversationType, MessageType } from "@/types/message";
import { vw } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  FlatList,
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
    socket.connect();
    socket.on("message", (msg) => {
      setMessageList((prev) => {
        return [...prev, msg];
      });
    });

    getConversationDetail(Number(params.conversationId)).then((res) => {
      console.log(res);
      setConversationDetail(res);
      setMessageList(res.messages);
    });
    return () => {
      socket.disconnect();
    };
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
                style={{
                  flexDirection: isMe ? "row-reverse" : "row",
                }}
              >
                <Text>头像</Text>
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
        <Button title="Send" onPress={sendMessage} />
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
});
