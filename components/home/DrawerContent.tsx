import { vw } from "@/utils";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";

const DrawerContent = () => {
  const router = useRouter();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.flex}>
          <TouchableNativeFeedback onPress={() => router.navigate("/cart")}>
            <View style={styles.listItem}>
              <Feather name="shopping-cart" size={24} color="black" />
              <Text>购物车</Text>
            </View>
          </TouchableNativeFeedback>
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
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: vw(8),
    paddingHorizontal: vw(16),
    paddingVertical: vw(8),
  },
});
