import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { THEME } from "../theme";

import { SignIn } from "@screens/SignIn";
import { SignUp } from "@screens/SignUp";

type AuthRoutes = {
  signIn: undefined;
  signUp: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: THEME.colors.gray[600],
      }}
    >
      <Screen
        name="signIn"
        component={SignIn}
        options={{ navigationBarColor: THEME.colors.white }}
      />

      <Screen name="signUp" component={SignUp} />
    </Navigator>
  );
}
