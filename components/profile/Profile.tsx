import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import { vw } from "@/utils";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { FC, useCallback, useEffect, useState } from "react";
import { getPostList } from "@/service/home";
import WaterFallList from "@/components/ui/WaterFallList";
import PostCard from "@/components/home/PostCard";
import { PostType, User } from "@/types";
import { findUserById } from "@/service/user";
import { D_BACKGROUND, D_BIO } from "@/constants";
import { useUser } from "@/store";
import { router, useFocusEffect } from "expo-router";
import { createConversation } from "@/service/message";
import { Button } from "../ui/Button";

interface ProfileProps {
  userId: number;
  left?: React.ReactNode;
}

export const Profile: FC<ProfileProps> = ({ userId, left }) => {
  const userStore = useUser();
  const [postList, setPostList] = useState<PostType[]>([]);
  const [userInfo, setUserInfo] = useState<User>();

  const isSelf = userStore.user?.user_id === userId;

  const refresh = async () => {
    const [{ data: list }, { data: user }] = await Promise.all([
      getPostList({ authorId: userId }),
      findUserById(userId),
    ]);
    setPostList(list);
    setUserInfo(user);
  };

  /** 私信 */
  const handleChat = async () => {
    if (!userStore.user) {
      return;
    }
    const {
      data: { conversation_id },
    } = await createConversation(userStore.user.user_id, userId);
    router.push({
      pathname: "/chat",
      params: { conversationId: conversation_id },
    });
  };

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [])
  );

  return !userInfo || !postList ? null : (
    <>
      <ImageBackground
        source={{
          uri: D_BACKGROUND,
        }}
        style={styles.headerImage}
      >
        <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}>
          <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>{left}</View>
            <View style={styles.baseInfo}>
              <Image
                source={{
                  uri: userInfo.avatar,
                }}
                style={styles.avatar}
              />
              <Text style={styles.username}>{userInfo.username}</Text>
            </View>
            <Text style={styles.white}>
              关注：<Text style={styles.white}>{userInfo.followings ?? 0}</Text>
              粉丝：<Text style={styles.white}>{userInfo.followers ?? 0}</Text>
            </Text>
            <Text style={styles.white}>{userInfo.bio || D_BIO}</Text>
            <View style={styles.action}>
              {isSelf ? (
                <>
                  <Button
                    title="编辑个人信息"
                    type="secondary"
                    onPress={() => {}}
                  />
                  <Button
                    title="设置"
                    type="secondary"
                    onPress={() => router.push("/settings")}
                  />
                </>
              ) : (
                <>
                  <Button title="关注" onPress={() => {}} />
                  <Button title="私信" type="secondary" onPress={handleChat} />
                </>
              )}
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.postList}>
        <View style={styles.contentHeader}>
          <Text>笔记</Text>
        </View>
        <WaterFallList
          data={postList}
          renderItem={({ item }) => <PostCard post={item} />}
          keyExtractor={(item) => item.post_id.toFixed()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    width: "100%",
  },
  container: {
    paddingHorizontal: vw(20),
    paddingBottom: vw(20),
  },
  topBar: {
    height: vw(48),
  },
  baseInfo: {
    marginTop: "auto",
    marginBottom: vw(20),
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: vw(100),
    height: vw(100),
    borderRadius: vw(50),
  },
  username: {
    fontSize: vw(20),
    color: "white",
  },
  white: {
    color: "white",
  },
  action: {
    flexDirection: "row",
    gap: 10,
    marginTop: vw(16),
  },
  contentHeader: {
    height: vw(48),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: vw(20),
  },
  postList: {},
});
