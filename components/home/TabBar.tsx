import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme, useLinkBuilder } from "@react-navigation/native";
import React, { memo } from "react";
import { ThemedText } from "../ui/ThemedText";
import { ThemedView } from "../ui/ThemedView";
import { PlatformPressable } from "@react-navigation/elements";
import { useRouter } from "expo-router";

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
  const router = useRouter();
  return (
    <ThemedView style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? (options.tabBarLabel as string)
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          // 如果点击的是添加按钮，跳转到编辑页面
          if (route.name === "Add") {
            router.push("/camera");
            return;
          }
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              height: 36,
              justifyContent: "center",
            }}
          >
            <ThemedText
              style={{
                color: isFocused ? colors.primary : colors.text,
                textAlign: "center",
              }}
            >
              {label}
            </ThemedText>
          </PlatformPressable>
        );
      })}
    </ThemedView>
  );
}

export default memo(TabBar);
