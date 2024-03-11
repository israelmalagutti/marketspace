import { TouchableOpacity } from "react-native";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { SHEET_HEIGHT, SHEET_OVERDRAG, styles } from "./styles";
import { Text, VStack, View, useTheme } from "native-base";

import { X } from "phosphor-react-native";

type BottomSheetProps = {
  children: React.ReactNode;
  title: string;

  onClose: () => void;
};

export function BottomSheet({ children, title, onClose }: BottomSheetProps) {
  const { colors } = useTheme();

  const offset = useSharedValue(0);

  const closeBottomSheet = () => {
    offset.value = 0;
    onClose();
  };

  const panGesture = Gesture.Pan()
    .onChange(event => {
      const offsetDelta = event.changeY + offset.value;

      const clamp = Math.max(-SHEET_OVERDRAG + 4, offsetDelta);
      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < SHEET_HEIGHT / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withSpring(SHEET_HEIGHT, {}, () => {
          runOnJS(closeBottomSheet)();
        });
      }
    });

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.ScrollView
        style={[
          styles.container,
          translateY,
          { backgroundColor: colors.gray[600] },
        ]}
      >
        <VStack>
          <View
            style={[styles.divider, { backgroundColor: colors.gray[400] }]}
          />

          <VStack space={6} mt={8}>
            <View
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize="lg" fontFamily="heading">
                {title}
              </Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => closeBottomSheet()}
              >
                <X size={24} color={colors.gray[400]} />
              </TouchableOpacity>
            </View>

            <View pb={24}>{children}</View>
          </VStack>
        </VStack>
      </Animated.ScrollView>
    </GestureDetector>
  );
}
