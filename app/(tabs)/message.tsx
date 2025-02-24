import { socket } from "@/service";
import { getConversations } from "@/service/message";
import { ConversationType } from "@/types/message";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MessageScreen = () => {
  const router = useRouter();
  // 会话列表
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  useEffect(() => {
    getConversations(1).then((res) => {
      setConversations(res.data);
    });

    socket.on("message", (msg) => {
      console.log(msg);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <SafeAreaView>
      <FlatList
        data={conversations}
        renderItem={(item) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/chat",
                params: {
                  conversationId: item.item.conversation_id,
                },
              })
            }
          >
            <View
              style={{ backgroundColor: item.index % 2 ? "white" : "gray" }}
            >
              <Text>{item.item.title}</Text>
              <Text>{item.item.last_message}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default MessageScreen;
