import { vw } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar, StyleSheet, Text, View } from "react-native";

const DrawerContent = () => {
  const router = useRouter();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.flex}>
          <Text>Drawer content!</Text>
        </View>
        <View style={styles.bottomBar}>
          <Ionicons
            name="settings-outline"
            size={24}
            color="gray"
            onPress={() =>
              router.push({
                pathname: "/settings",
              })
            }
          />
        </View>
      </View>
    </>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: StatusBar.currentHeight,
  },
  flex: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: vw(16),
    paddingVertical: vw(8),
  },
});
