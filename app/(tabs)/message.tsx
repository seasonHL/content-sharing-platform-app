// import { socket } from "@/service";
import { useSocket } from "@/hooks/useSocket";
import { BASE_URL } from "@/service";
import { getConversations } from "@/service/message";
import { useToken, useUser } from "@/store";
import { ConversationType } from "@/types/message";
import { timestampToTime, vw } from "@/utils";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";

const MessageScreen = () => {
  const router = useRouter();
  const userStore = useUser();
  // 会话列表
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  const socket = useSocket(
    useMemo(
      () => ({
        onMessage: (msg) => {
          Notifications.scheduleNotificationAsync({
            content: {
              title:
                conversations.find(
                  (conv) => conv.conversation_id === msg.conversation_id
                )?.title || "消息",
              body: msg.content,
            },
            trigger: null,
          });
        },
      }),
      [conversations]
    )
  );

  useFocusEffect(
    useCallback(() => {
      if (!userStore.user) return;
      getConversations(userStore.user.user_id).then((res) => {
        setConversations(res.data);
      });
    }, [userStore.user])
  );
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
            <View style={styles.conversation}>
              <Image source={{ uri: item.item.avatar }} style={styles.avatar} />
              <View>
                <Text>{item.item.title}</Text>
                <Text style={styles.description}>{item.item.last_message}</Text>
              </View>
              <Text style={[styles.mlAuto, styles.description]}>
                {timestampToTime(item.item.updated_at)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  conversation: {
    flexDirection: "row",
    alignItems: "center",
    padding: vw(10),
    gap: vw(10),
  },
  avatar: {
    width: vw(50),
    height: vw(50),
    borderRadius: vw(25),
  },
  description: {
    color: "gray",
    fontSize: vw(12),
  },
  mlAuto: {
    marginLeft: "auto",
  },
});
