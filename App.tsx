import { THEME } from "./src/theme";

import { Routes } from "@routes/index";

import { Loading } from "@components/index";
import { NativeBaseProvider, StatusBar } from "native-base";

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
      {fontsLoaded ? <Routes /> : <Loading />}

      <StatusBar
        translucent
        backgroundColor={THEME.colors.gray[600]}
        barStyle="dark-content"
      />
    </NativeBaseProvider>
  );
}
