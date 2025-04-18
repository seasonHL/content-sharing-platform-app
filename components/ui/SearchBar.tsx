import { vw } from "@/utils";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { FC, ReactNode, useState } from "react";
import { Toggle } from "./Toggle";

interface SearchBarProps {
  onSearch?: (value: string) => void;
  left?: ReactNode;
}

export const SearchBar: FC<SearchBarProps> = ({ left, onSearch }) => {
  const [text, setText] = useState<string>("");
  const onSearchHandler = () => {
    if (onSearch) {
      onSearch(text);
      setText("");
    }
  };
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
        <TextInput
          style={[styles.grow, styles.ipt]}
          value={text}
          onChangeText={setText}
          placeholder="搜索"
          placeholderTextColor="gray"
          onSubmitEditing={onSearchHandler}
        />
      </View>
      <Text onPress={onSearchHandler}>搜索</Text>
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
  ipt: {
    fontSize: vw(16),
    paddingVertical: vw(0),
  },
});
