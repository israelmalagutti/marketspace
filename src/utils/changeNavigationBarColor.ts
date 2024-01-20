import * as NavigationBar from "expo-navigation-bar";

import { THEME } from "../theme";

export async function changeNavigationBarColor() {
  await NavigationBar.setBackgroundColorAsync(THEME.colors.white);

  await NavigationBar.setButtonStyleAsync("dark");
}
