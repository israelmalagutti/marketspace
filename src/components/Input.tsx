import React, { useCallback, useState } from "react";
import { Input as NBInput, IInputProps, Box, FormControl } from "native-base";
import { Eye } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

type Props = IInputProps & {
  errorMessage?: string | null;

  secure?: boolean;
};

export function Input({ errorMessage, isInvalid, secure, ...rest }: Props) {
  const [active, setActive] = useState(false);
  const [isSecure, setIsSecure] = useState(true);

  const invalid = !!errorMessage || isInvalid;

  const handleFocus = useCallback(() => {
    setActive(true);
  }, []);

  const handleBlur = useCallback(() => {
    setActive(false);
  }, []);

  const toggleVisibility = () => {
    setIsSecure(prev => !prev);
  };

  const getBorderColor = useCallback(() => {
    const defaultColor = "transparent";
    const invalidColor = invalid && "red.500";
    const activeColor = active && "blue.100";

    const color = (invalidColor ?? activeColor) || defaultColor;

    return color;
  }, [active, invalid]);

  return (
    <FormControl isInvalid={invalid}>
      <Box
        flexDirection="row"
        backgroundColor="white"
        alignItems="center"
        paddingRight={3}
        borderRadius={6}
        borderWidth={2}
        borderColor={getBorderColor()}
      >
        <NBInput
          {...rest}
          flexGrow={1}
          fontFamily="body"
          fontSize={16}
          borderWidth={0}
          borderColor="transparent"
          placeholderTextColor="gray.400"
          secureTextEntry={secure && isSecure}
          isInvalid={invalid}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <TouchableOpacity activeOpacity={0.7} onPress={toggleVisibility}>
          <Eye size={20} />
        </TouchableOpacity>
      </Box>

      <FormControl.ErrorMessage _text={{ color: "red.500" }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
