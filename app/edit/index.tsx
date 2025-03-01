import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  StyleSheet,
  TouchableNativeFeedback,
  ToastAndroid,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { requestPermission } from "@/utils/permission";
import { AntDesign } from "@expo/vector-icons";
import { vw } from "@/utils";
import { Show } from "@/components/ui/Show";

type EditPageParams = {
  uri: string;
};
export default function EditPage() {
  const params = useLocalSearchParams<EditPageParams>();
  const [selectedImage, setSelectedImage] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");

  const publish = async () => {
    router.dismissAll();
    router.push({
      pathname: "/",
    });
  };

  const pickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage([...selectedImage, result.assets[0].uri]);
    }
  };

  useEffect(() => {
    if (!params.uri || selectedImage.length) return;
    FileSystem.getInfoAsync(params.uri).then((info) => {
      if (info.exists) {
        setSelectedImage([...selectedImage, params.uri]);
      } else {
        ToastAndroid.show("图片不存在", ToastAndroid.SHORT);
      }
    });
  }, [params.uri]);

  useEffect(() => {
    requestPermission();
  }, []);
  return (
    <ThemedSafeAreaView style={styles.container}>
      {/* 图片区域 */}
      <View style={styles.gallery}>
        <Show when={!!selectedImage}>
          {selectedImage.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.image} />
          ))}
        </Show>
        <Show when={selectedImage.length < 9}>
          <TouchableNativeFeedback onPress={pickImage}>
            <View style={styles.addImage}>
              <AntDesign name="plus" size={24} color="#ccc" />
            </View>
          </TouchableNativeFeedback>
        </Show>
      </View>
      <View>
        <TextInput
          placeholder="添加正文"
          cursorColor={"red"}
          onChangeText={setContent}
        />
      </View>
      {/* 底部栏 */}
      <View style={styles.bottomBar}>
        <Button title="发布" onPress={publish} />
      </View>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gallery: {
    width: vw(396),
    marginHorizontal: "auto",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: vw(10),
  },
  image: {
    width: vw(120),
    height: vw(120),
    borderRadius: 8,
  },
  addImage: {
    width: vw(120),
    height: vw(120),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  bottomBar: {
    marginTop: "auto",
    padding: vw(16),
  },
});
