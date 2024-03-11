import { Dimensions, StyleSheet } from "react-native";

const DIMENSIONS = Dimensions.get("window");

export const SHEET_HEIGHT = (DIMENSIONS.height * 3) / 4;
export const SHEET_OVERDRAG = 18;

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    width: DIMENSIONS.width,
    height: SHEET_HEIGHT,

    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 32,

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    position: "absolute",
    bottom: -SHEET_OVERDRAG,
  },

  divider: {
    height: 4,
    width: DIMENSIONS.width / 4,

    alignSelf: "center",

    borderRadius: 999,
  },

  content: {
    paddingTop: 32,
  },
});
