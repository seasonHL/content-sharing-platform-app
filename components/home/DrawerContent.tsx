import { StatusBar, Text, View } from "react-native";

const DrawerContent = () => {
  return (
    <>
      <View style={{ paddingTop: StatusBar.currentHeight }}>
        <Text>Drawer content!</Text>
      </View>
    </>
  );
};

export default DrawerContent;
