import * as ImagePicker from "expo-image-picker";

export const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
        alert("抱歉，需要相册权限才能选择图片。");
        return false;
    }
    return true;
};