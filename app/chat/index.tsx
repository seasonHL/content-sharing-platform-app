import { socket } from "@/service";
import { MessageType } from "@/types/message";
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

  const sendMessage = () => {
    const msg = {
      content: text,
      receiver_id: 3,
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
            return <Text>{item.content}</Text>;
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
});
