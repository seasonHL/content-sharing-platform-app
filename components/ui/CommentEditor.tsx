import { vw } from "@/utils";
import { FC, memo, useEffect, useState } from "react";
import {
  TouchableNativeFeedback,
  View,
  TextInput,
  Button,
  Keyboard,
  StyleSheet,
} from "react-native";

interface Props {
  show: boolean;
  onSend: (content: string) => void;
  onCancel: () => void;
}

export const CommentEditor: FC<Props> = memo((props) => {
  const [content, setContent] = useState("");
  useEffect(() => {
    // 定义键盘收起事件的处理函数
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        props?.onCancel();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);
  return props.show ? (
    <TouchableNativeFeedback
      onPress={() => {
        props?.onCancel();
      }}
    >
      <View style={styles.container}>
        <View style={styles.textBar}>
          <TextInput
            style={{ flex: 1 }}
            autoFocus
            placeholder="评论"
            onChangeText={setContent}
          />
          <Button title="发送" onPress={() => props.onSend(content)} />
        </View>
      </View>
    </TouchableNativeFeedback>
  ) : null;
});

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  textBar: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: vw(8),
    paddingVertical: vw(8),
    alignItems: "center",
  },
});
