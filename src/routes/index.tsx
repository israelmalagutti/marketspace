import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { Box, useTheme } from "native-base";

import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[600];

  return (
    <Box flex={1}>
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  );
}
