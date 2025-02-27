import { vw } from "@/utils";
import { ThemedView } from "../ui/ThemedView";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContext } from "@/app/(tabs)/_layout";
import { useContext } from "react";
import { useRouter } from "expo-router";

export default function HomePageHeader() {
  const drawerCtx = useContext(DrawerContext);
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <Ionicons
        name="menu"
        size={24}
        color="gray"
        onPress={() => drawerCtx.setOpen(true)}
      />
      <View style={[styles.mlAuto]}>
        <Ionicons
          name="search"
          size={24}
          color="gray"
          onPress={() => router.push({ pathname: "/search" })}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: vw(4),
    paddingHorizontal: vw(8),
    paddingTop: StatusBar.currentHeight,
  },
  mlAuto: {
    marginLeft: "auto",
  },
});
