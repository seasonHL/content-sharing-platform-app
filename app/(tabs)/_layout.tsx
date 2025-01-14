import { Tabs, useRouter } from "expo-router";
import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Platform, ToastAndroid, View, Text } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from ".";
import ProfileScreen from "./profile";
import ExploreScreen from "./explore";
import TabBar from "@/components/home/TabBar";
import { Drawer } from "react-native-drawer-layout";
import DrawerContent from "@/components/home/DrawerContent";

const Tab = createBottomTabNavigator();

interface DrawerContextType {
  setOpen: (open: boolean) => void;
}
const defaultValue: DrawerContextType = {
  setOpen: () => {},
};
export const DrawerContext = createContext<DrawerContextType>(defaultValue);

export default function TabLayout() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const screens = useMemo(
    () => ({
      Home: () => <HomeScreen />,
      Explore: () => <ExploreScreen />,
      Add: () => null,
      Message: () => null,
      Profile: () => <ProfileScreen />,
    }),
    []
  );

  useEffect(() => {
    AsyncStorage.getItem("access_token").then((res) => {
      console.log(res);
      if (res === null) {
        ToastAndroid.show("请先登录", 3);
        router.navigate("/auth");
      }
    });
  }, []);
  return (
    <DrawerContext.Provider value={{ setOpen }}>
      <Drawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        renderDrawerContent={() => <DrawerContent />}
      >
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarIconStyle: { display: "none" },
          }}
          tabBar={(props) => <TabBar {...props} />}
        >
          <Tab.Screen
            name="Home"
            component={screens.Home}
            options={{
              tabBarLabel: "首页",
            }}
          />
          <Tab.Screen
            name="Explore"
            component={screens.Explore}
            options={{
              tabBarLabel: "商城",
            }}
          />
          <Tab.Screen
            name="Add"
            component={screens.Add}
            options={{
              tabBarLabel: "发布",
            }}
          />
          <Tab.Screen
            name="Message"
            component={screens.Message}
            options={{
              tabBarLabel: "消息",
            }}
          />
          <Tab.Screen
            name="Profile"
            component={screens.Profile}
            options={{
              tabBarLabel: "我",
            }}
          />
        </Tab.Navigator>
      </Drawer>
    </DrawerContext.Provider>
  );
}
