import { useToken } from "@/store";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsPage() {
  const tokenStore = useToken();
  return (
    <SafeAreaView>
      <Text>设置</Text>
      <Button title="退出登录" onPress={tokenStore.clearToken} />
    </SafeAreaView>
  );
}
