import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

export const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
        alert("抱歉，需要相册权限才能选择图片。");
        return false;
    }
    return true;
};

/**
 * 异步注册推送通知的函数。
 * 此函数用于在设备上注册推送通知，并获取Expo推送令牌。
 * 如果设备不支持推送通知或用户拒绝权限，将显示相应的警告信息。
 * 
 * @returns {Promise<string | undefined>} 如果成功获取到推送令牌，则返回该令牌；否则返回undefined。
 */
export async function registerForPushNotificationsAsync() {
    // 声明一个变量用于存储推送令牌
    let token;
    // 检查是否为真实设备
    if (Device.isDevice) {
        // 获取当前设备的通知权限状态
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        console.log('成功获取当前设备的通知权限状态:', { status: existingStatus })
        // 初始化最终权限状态为当前状态
        let finalStatus = existingStatus;
        // 如果当前权限未授予，则请求通知权限
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            console.log('成功请求通知权限')
            finalStatus = status;
        }
        // 如果最终权限仍未授予，则显示警告信息并返回
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
        }
        // 获取Expo推送令牌
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('成功获取Expo推送令牌')
        // 打印获取到的推送令牌
        console.log(token);
    } else {
        // 如果不是真实设备，则显示警告信息
        alert("Must use physical device for Push Notifications");
    }

    // 如果是安卓系统，设置通知渠道
    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    // 返回获取到的推送令牌
    return token;
}