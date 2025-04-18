import { User } from "@/types";
import { createStyle } from "@/utils";
import { FC, memo } from "react";
import { View, Text, Image } from "react-native";
import Avatar from "../ui/Avatar";
import { Button } from "../ui/Button";

interface UserCardProps {
  user: User;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  return (
    <View style={styles.container}>
      <Avatar user={user} size={48} />
      <Text>{user.username}</Text>
      <View style={styles.action}>
        <Button title="关注" />
      </View>
    </View>
  );
};

const styles = createStyle({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
  },
  action: {
    marginLeft: "auto",
  },
});

export default memo(UserCard);
