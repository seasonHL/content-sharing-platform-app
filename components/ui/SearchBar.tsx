import { vw } from "@/utils";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { FC, ReactNode } from "react";
import { Toggle } from "./Toggle";

interface SearchBarProps {
  onSearch?: () => void;
  left?: ReactNode;
}

export const SearchBar: FC<SearchBarProps> = ({ left, onSearch }) => {
  return (
    <ThemedView style={styles.top}>
      <Toggle
        isToggle={!!(left || left === null)}
        defaultComponent={
          <AntDesign
            name="left"
            size={vw(24)}
            color="gray"
            onPress={router.back}
          />
        }
        toggleComponent={left}
      />
      <View style={styles.searchBar}>
        <Ionicons name="search" size={vw(24)} color="gray" />
        <TextInput style={styles.grow} />
      </View>
      <Text onPress={onSearch}>搜索</Text>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
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
