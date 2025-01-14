import { Button, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <>
      <Image
        source={{
          uri: "https://act-webstatic.mihoyo.com/event-static/2023/08/15/55ccd259cca4f64ae81f2d113a153bae_4886659032180241796.png?x-oss-process=image/quality,Q_80/resize,m_lfit,s_500",
        }}
        style={styles.headerImage}
      />
      <Button title="去登录" onPress={() => router.navigate("/auth")} />
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: "100%",
    aspectRatio: 4 / 3,
  },
});
