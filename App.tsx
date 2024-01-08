import { StatusBar, Text } from "react-native";

import { THEME } from "./src/theme";

import { Loading } from "@components/index";
import { NativeBaseProvider } from "native-base";

import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      {fontsLoaded ? <Text>Hello World!</Text> : <Loading />}

      <StatusBar
        translucent
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
      />
    </NativeBaseProvider>
  );
}
