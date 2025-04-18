import { login } from "@/service/auth";
import { useRouter } from "expo-router";
import { useReducer } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Fields {
  username: string;
  password: string;
}
interface AuthReducerAction {
  type: string;
  value: string;
}
const authReducer = (state: Fields, action: AuthReducerAction) => {
  const { type, value } = action;
  switch (type) {
    case "username":
      return {
        ...state,
        username: value,
      };
    case "password":
      return {
        ...state,
        password: value,
      };

    default:
      return state;
  }
};
const defaultFields = {
  username: "",
  password: "",
};
export default function AuthPage() {
  const [state, dispatch] = useReducer(authReducer, defaultFields);
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const flag = await login(state);
      if (flag) {
        router.replace("/");
      } else {
        ToastAndroid.show("账号或密码错误", 3);
      }
    } catch (error) {}
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder="账号"
          value={state.username}
          onChangeText={(value) => dispatch({ type: "username", value })}
        />
        <TextInput
          placeholder="密码"
          value={state.password}
          onChangeText={(value) => dispatch({ type: "password", value })}
          secureTextEntry
        />
        <Button title="登录" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: 200,
    marginTop: 200,
  },
});
