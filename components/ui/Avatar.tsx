import { User } from "@/types";
import { vw } from "@/utils";
import { router } from "expo-router";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";

interface AvatarProps {
  user?: (Partial<User> & Required<Pick<User, "user_id" | "avatar">>) | null;
  size?: number;
  onPress?: () => void;
}

export default function Avatar({ user, size, onPress }: AvatarProps) {
  if (!user) return null;
  const avatarSize = size || vw(40);
  const avatarStyle = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
  };
  const pressHandler = () => {
    if (onPress) {
      onPress();
    } else {
      router.push({
        pathname: `/user/[id]`,
        params: { id: user.user_id },
      });
    }
  };
  return (
    <Pressable onPress={pressHandler}>
      <Image source={{ uri: user.avatar }} style={avatarStyle} />
    </Pressable>
  );
}
