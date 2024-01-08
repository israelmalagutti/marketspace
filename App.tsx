import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";

import { NativeBaseProvider } from "native-base";
import { THEME } from "src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <View style={{ flex: 1 }}>
        {fontsLoaded ? <Text>Hello World!</Text> : <Text>Loading...</Text>}
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
}
