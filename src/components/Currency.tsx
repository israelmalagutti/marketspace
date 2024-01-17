import { useCallback, useState } from "react";

import { Text, StyledProps, HStack } from "native-base";

type CurrencyType = "brl";

type CurrencyProps = StyledProps & {
  currency?: CurrencyType;
  price: number | string;

  currencySize?: StyledProps["fontSize"];
  priceSize?: StyledProps["fontSize"];

  isDisabled?: boolean;
};

export function Currency({
  currency = "brl",
  price,

  color,
  currencySize = "sm",
  priceSize = "lg",

  isDisabled = false,
}: CurrencyProps) {
  const [currencyType, setCurrencyType] = useState<string>("R$");

  useCallback(() => {
    if (currency === "brl") setCurrencyType("U$");
  }, []);

  return (
    <HStack alignItems="baseline" space={0.5}>
      <Text
        color={isDisabled ? "gray.400" : color}
        fontFamily={isDisabled ? "body" : "heading"}
        fontSize={currencySize}
      >
        {currencyType}
      </Text>
      <Text
        color={isDisabled ? "gray.400" : color}
        fontFamily={isDisabled ? "body" : "heading"}
        fontSize={priceSize}
      >
        {price}
      </Text>
    </HStack>
  );
}
