import { vw } from "@/utils";
import { ThemedView } from "../ui/ThemedView";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContext } from "@/app/(tabs)/_layout";
import { useContext } from "react";

export default function HomePageHeader() {
  const drawerCtx = useContext(DrawerContext);

  return (
    <ThemedView style={styles.container}>
      <Ionicons
        name="menu"
        size={24}
        color="gray"
        onPress={() => drawerCtx.setOpen(true)}
      />
      <View style={[styles.mlAuto]}>
        <Ionicons name="search" size={24} color="gray" />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: vw(4),
    paddingHorizontal: vw(8),
  },
  mlAuto: {
    marginLeft: "auto",
  },
});
