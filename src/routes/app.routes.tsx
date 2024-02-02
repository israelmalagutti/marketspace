import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { useTheme } from "native-base";

import { Home } from "@screens/Home";
import { Product } from "@screens/Product";
import { MyAds } from "@screens/MyAds";
import { MyProduct } from "@screens/MyProduct";
import { CreateAd } from "@screens/CreateAd";

import { House, SignOut, Tag } from "phosphor-react-native";
import { ProductPreview } from "@screens/ProductPreview";

type AppRoutes = {
  home: undefined;
  product: undefined;
  myProduct: undefined;

  myAds: undefined;
  createAd: undefined;
  productPreview: undefined;

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
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ color }) => (
            <House color={color} size={ICON_SIZE} weight="bold" />
          ),
        }}
      />

      <Screen
        name="product"
        component={Product}
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: () => undefined,
        }}
      />

      <Screen
        name="myAds"
        component={MyAds}
        options={{
          tabBarIcon: ({ color }) => (
            <Tag color={color} size={ICON_SIZE} weight="bold" />
          ),
        }}
      />

      <Screen
        name="myProduct"
        component={MyProduct}
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: () => undefined,
        }}
      />

      <Screen
        name="createAd"
        component={CreateAd}
        options={{
          tabBarStyle: {
            display: "none",
          },
          tabBarButton: () => undefined,
        }}
      />

      <Screen
        name="productPreview"
        component={ProductPreview}
        options={{
          tabBarStyle: {
            display: "none",
          },
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
