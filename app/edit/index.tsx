import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import * as FileSystem from "expo-file-system";
import { requestPermission } from "@/utils/permission";

type EditPageParams = {
  uri: string;
};
export default function EditPage() {
  const [selectedImage, setSelectedImage] = useState<string[]>([]);
  const params = useLocalSearchParams<EditPageParams>();

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
    FileSystem.getInfoAsync(params.uri).then((info) => {
      if (info.exists) {
        console.log("文件存在");
        setSelectedImage([...selectedImage, params.uri]);
      } else {
        console.log("文件不存在");
      }
    });
  }, [params.uri]);

  useEffect(() => {
    requestPermission();
  }, []);
  return (
    <ThemedSafeAreaView style={styles.container}>
      <Button title="从相册选择图片" onPress={pickImage} />
      {selectedImage &&
        selectedImage.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
