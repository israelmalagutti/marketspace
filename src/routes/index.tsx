import { NavigationContainer } from "@react-navigation/native";

import { Box } from "native-base";

import { AuthRoutes } from "./auth.routes";

export function Routes() {
  return (
    <Box>
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  );
}
