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
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { requestPermission } from "@/utils/permission";
import { AntDesign } from "@expo/vector-icons";
import { vw } from "@/utils";
import { Show } from "@/components/ui/Show";
import { uploadImagesByUris } from "@/service/upload";
import { useUser } from "@/store";
import { createPost } from "@/service/post";

type EditPageParams = {
  uri: string;
};
export default function EditPage() {
  const params = useLocalSearchParams<EditPageParams>();
  const userStore = useUser();
  const [selectedImage, setSelectedImage] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const publish = async () => {
    if (!selectedImage.length) {
      ToastAndroid.show("请选择图片", ToastAndroid.SHORT);
      return;
    }
    try {
      const { data: urls } = await uploadImagesByUris(selectedImage);
      const post = {
        title,
        content,
        author_id: userStore.user!.user_id,
        media: urls.map((url) => ({
          media_url: url,
          media_type: "image",
        })),
      };
      await createPost(post);
      router.dismissAll();
      router.push({
        pathname: "/",
      });
    } catch (error) {
      console.error(error);
    }
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

  const handleImageLongPress = (index: number) => {
    Alert.alert("删除图片", "确定删除这张图片吗", [
      {
        text: "取消",
        style: "cancel",
      },
      {
        text: "删除",
        onPress: () => {
          const newImages = [...selectedImage];
          newImages.splice(index, 1);
          setSelectedImage(newImages);
        },
        style: "destructive",
      },
    ]);
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
            <TouchableNativeFeedback
              key={index}
              onLongPress={() => handleImageLongPress(index)}
            >
              <Image source={{ uri }} style={styles.image} />
            </TouchableNativeFeedback>
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
          placeholder="添加标题"
          cursorColor={"red"}
          onChangeText={setTitle}
          style={styles.tile}
        />
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
  tile: {
    fontSize: vw(18),
    fontWeight: "bold",
  },
});
