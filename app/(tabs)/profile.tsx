import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { useUser } from "@/store";
import { vw } from "@/utils";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerContext } from "./_layout";
import { useCallback, useContext, useState } from "react";
import { getPostList } from "@/service/home";
import WaterFallList from "@/components/ui/WaterFallList";
import PostCard from "@/components/home/PostCard";
import { PostType } from "@/types";

export default function ProfileScreen() {
  const userStore = useUser();
  const drawerCtx = useContext(DrawerContext);
  const [postList, setPostList] = useState<PostType[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (!userStore.user) return;
      getPostList({ user_id: userStore.user.user_id }).then((res) => {
        setPostList(res);
      });
    }, [userStore.user])
  );

  return (
    <>
      <ImageBackground
        source={{
          uri: "https://act-webstatic.mihoyo.com/event-static/2023/08/15/55ccd259cca4f64ae81f2d113a153bae_4886659032180241796.png?x-oss-process=image/quality,Q_80/resize,m_lfit,s_500",
        }}
        style={styles.headerImage}
      >
        <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}>
          <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
              <Ionicons
                name="menu"
                size={24}
                color="white"
                onPress={() => drawerCtx.setOpen(true)}
              />
            </View>
            <View style={styles.baseInfo}>
              <Image
                source={{
                  uri: userStore.user?.avatar,
                }}
                style={styles.avatar}
              />
              <Text style={styles.username}>{userStore.user?.username}</Text>
            </View>
            <Text style={styles.white}>这个人很懒，暂时没有简介~</Text>
            <View></View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.postList}>
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
}

const styles = StyleSheet.create({
  headerImage: {
    width: "100%",
    aspectRatio: 7 / 4,
  },
  container: {
    height: "100%",
    paddingHorizontal: vw(20),
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
  postList: {
    paddingTop: vw(20),
  },
});
