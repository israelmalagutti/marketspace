import { Button as NBButton, IButtonProps, Text, HStack } from "native-base";

type ButtonProps = IButtonProps & {
  label: string;

  bgColor?: "blue.100" | "black" | "gray.500";
  textColor?: "gray.700" | "gray.200";
};

export function Button({
  label,

  bgColor = "gray.500",
  textColor = "gray.200",

  children,
  ...rest
}: ButtonProps) {
  return (
    <NBButton
      {...rest}
      activeOpacity={0.7}
      backgroundColor={bgColor}
      p={3}
      borderRadius={6}
    >
      <HStack alignItems="center" space={2}>
        {children}

        <Text
          textAlign="center"
          color={textColor}
          fontFamily="heading"
          fontSize="sm"
        >
          {label}
        </Text>
      </HStack>
    </NBButton>
  );
}
