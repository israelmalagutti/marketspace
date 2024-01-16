import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { useAuth } from "@hooks/useAuth";
import { Box, useTheme } from "native-base";

export function Routes() {
  const { colors } = useTheme();

  const { user } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[600];

  const changeNavigationBarColor = async () => {
    await NavigationBar.setBackgroundColorAsync(colors.gray[600]);
    await NavigationBar.setButtonStyleAsync("dark");
  };

  useEffect(() => {
    if (user) changeNavigationBarColor();
  }, []);

  return (
    <Box flex={1} pt={6} pb={!user ? 0 : 6}>
      <NavigationContainer theme={theme}>
        {user ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
