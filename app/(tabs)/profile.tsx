import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "@/store";
import { vw } from "@/utils";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileScreen() {
  const router = useRouter();
  const userStore = useUser();
  return (
    <>
      <ImageBackground
        source={{
          uri: "https://act-webstatic.mihoyo.com/event-static/2023/08/15/55ccd259cca4f64ae81f2d113a153bae_4886659032180241796.png?x-oss-process=image/quality,Q_80/resize,m_lfit,s_500",
        }}
        style={styles.headerImage}
      >
        <LinearGradient
          style={{
            height: "100%",
          }}
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
        >
          <View style={styles.container}>
            <Image
              source={{
                uri: userStore.user?.avatar,
              }}
              style={styles.avatar}
            />
            <Text style={styles.username}>{userStore.user?.username}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      <Button title="去登录" onPress={() => router.navigate("/auth")} />
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: "100%",
    aspectRatio: 7 / 4,
  },
  container: {
    marginTop: "auto",
    marginBottom: vw(20),
    marginLeft: vw(20),
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
});
