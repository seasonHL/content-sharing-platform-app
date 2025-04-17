import { useUser } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContext } from "./_layout";
import { useContext } from "react";
import { Profile } from "@/components/profile/Profile";

export default function ProfileScreen() {
  const userStore = useUser();
  const drawerCtx = useContext(DrawerContext);

  return (
    <>
      {userStore.user && (
        <Profile
          userId={userStore.user.user_id}
          left={
            <Ionicons
              name="menu"
              size={24}
              color="white"
              onPress={() => drawerCtx.setOpen(true)}
            />
          }
        />
      )}
    </>
  );
}
