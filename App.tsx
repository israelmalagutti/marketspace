import { GestureHandlerRootView } from "react-native-gesture-handler";

import { THEME } from "./src/theme";

import { Routes } from "@routes/index";

import { Loading } from "@components/index";
import { NativeBaseProvider, StatusBar } from "native-base";

import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";

import { AuthProvider } from "@contexts/AuthContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider theme={THEME}>
        <AuthProvider>{fontsLoaded ? <Routes /> : <Loading />}</AuthProvider>

        <StatusBar
          translucent
          backgroundColor={THEME.colors.gray[600]}
          barStyle="dark-content"
        />
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
