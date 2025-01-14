import { Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function ExploreScreen() {
  const router = useRouter();
  return <></>;
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
