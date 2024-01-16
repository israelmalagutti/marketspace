import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { useTheme } from "native-base";

import { Home } from "@screens/Home";

import { House, SignOut, Tag } from "phosphor-react-native";

type AppRoutes = {
  home: undefined;

  myAds: undefined;
  createAd: undefined;

  signOut: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

const ICON_SIZE = 24;

export function AppRoutes() {
  const { colors, sizes } = useTheme();

  return (
    <Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[200],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          alignItems: "center",
          backgroundColor: colors.gray[700],
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingTop: sizes[6],
          paddingBottom: sizes[6],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <House color={color} size={ICON_SIZE} weight="bold" />
          ),
        }}
      />

      <Screen
        name="myAds"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Tag color={color} size={ICON_SIZE} weight="bold" />
          ),
        }}
      />

      <Screen
        name="createAd"
        component={Home}
        options={{
          tabBarButton: () => undefined,
        }}
      />

      <Screen
        name="signOut"
        component={Home}
        options={{
          tabBarIcon: () => (
            <SignOut color={colors.red[100]} size={ICON_SIZE} weight="bold" />
          ),
        }}
      />
    </Navigator>
  );
}
