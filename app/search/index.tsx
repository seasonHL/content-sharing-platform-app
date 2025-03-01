import { SearchBar } from "@/components/ui/SearchBar";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { vw } from "@/utils";
import { View, Text, StyleSheet, ToastAndroid } from "react-native";

export default function SearchPage() {
  const searchHandler = () => {
    ToastAndroid.show("搜索", ToastAndroid.SHORT);
  };
  return (
    <ThemedSafeAreaView style={styles.container}>
      {/* 搜索栏 */}
      <SearchBar onSearch={searchHandler} />
      {/* 展示 */}
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: vw(8),
  },
  grow: {
    flex: 1,
  },
});
