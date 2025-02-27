import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { ThemedView } from "@/components/ui/ThemedView";
import { vw } from "@/utils";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, Text, StyleSheet, TextInput, ToastAndroid } from "react-native";

export default function SearchPage() {
  const searchHandler = () => {
    ToastAndroid.show("搜索", ToastAndroid.SHORT);
  };
  return (
    <ThemedSafeAreaView style={styles.container}>
      {/* 搜索栏 */}
      <ThemedView style={styles.top}>
        <AntDesign
          name="left"
          size={vw(24)}
          color="gray"
          onPress={router.back}
        />
        <View style={styles.searchBar}>
          <Ionicons name="search" size={vw(24)} color="gray" />
          <TextInput style={styles.grow} />
        </View>
        <Text onPress={searchHandler}>搜索</Text>
      </ThemedView>
      {/* 展示 */}
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: vw(8),
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: vw(8),
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ececec",
    marginHorizontal: vw(8),
    paddingHorizontal: vw(8),
    height: vw(40),
    borderRadius: vw(20),
  },
  grow: {
    flex: 1,
  },
});
