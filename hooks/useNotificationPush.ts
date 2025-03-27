import { registerForPushNotificationsAsync } from "@/utils/permission";
import { useState, useRef, useEffect } from "react";
import * as Notifications from "expo-notifications";

export const useNotificationPush = () => {
    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] =
        useState<Notifications.Notification>();
    const notificationListener = useRef<Notifications.EventSubscription>();
    const responseListener = useRef<Notifications.EventSubscription>();

    useEffect(() => {
        registerForPushNotificationsAsync().then(
            (token) => token && setExpoPushToken(token)
        );

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener((response) => {
                console.log(response);
            });

        return () => {
            if (notificationListener.current) {
                Notifications.removeNotificationSubscription(
                    notificationListener.current
                );
            }

            if (responseListener.current) {
                Notifications.removeNotificationSubscription(responseListener.current);
            }
        };
    }, []);

    return { expoPushToken, notification };
}