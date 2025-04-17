import { useLocalSearchParams } from "expo-router";
import { Show } from "@/components/ui/Show";
import { Profile } from "@/components/profile/Profile";

export default function ProfileScreen() {
  const { id: userId } = useLocalSearchParams();

  return (
    <Show when={userId}>
      <Profile userId={Number(userId)} />
    </Show>
  );
}
