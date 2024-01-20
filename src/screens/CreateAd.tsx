import { useLayoutEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Button, Checkbox, Input, Switch } from "@components/index";
import { Text, VStack, ScrollView, useTheme, HStack, View } from "native-base";

import { ArrowLeft, Plus } from "phosphor-react-native";

import { Controller, useForm } from "react-hook-form";

import { changeNavigationBarColor } from "@utils/index";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

const PaymentMethods = [
  "Boleto",
  "Pix",
  "Dinheiro",
  "Cartão de Crédito",
  "Depósito Bancário",
];

export function CreateAd() {
  const [condition, setCondition] = useState<"new" | "used">("new");
  const [tradePreference, setTradePreference] = useState(false);

  const { colors } = useTheme();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { control } = useForm();

  useLayoutEffect(() => {
    changeNavigationBarColor();
  }, []);

  return (
    <VStack flex={1} space={6}>
      <HStack justifyContent="space-between" pt={5} px={6}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color={colors.gray[100]} size={24} />
        </TouchableOpacity>

        <Text color="gray.100" fontFamily="heading" fontSize="lg">
          Criar anúncio
        </Text>

        <View />
      </HStack>

      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        <VStack flex={1} space={6}>
          <View>
            <VStack px={6}>
              <Text color="gray.200" fontFamily="heading" fontSize="md">
                Imagens
              </Text>
              <Text fontFamily="body" fontSize="sm">
                Escolha até 3 imagens para mostrar o quanto o seu produto é
                incrível!
              </Text>
            </VStack>

            <ScrollView
              horizontal
              alwaysBounceHorizontal={false}
              alwaysBounceVertical={false}
              contentContainerStyle={{
                flexGrow: 1,
                paddingVertical: 16,
                paddingHorizontal: 24,
                gap: 8,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  aspectRatio: 1,
                  height: 100,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: colors.gray[500],
                  borderRadius: 6,
                }}
              >
                <Plus color={colors.gray[400]} />
              </TouchableOpacity>
            </ScrollView>
          </View>

          <VStack mt={-4} px={6} space={4}>
            <Text color="gray.200" fontFamily="heading" fontSize="md">
              Sobre o produto
            </Text>

            <Controller
              control={control}
              name="title"
              render={() => <Input placeholder="Títlulo do anúncio" />}
            />

            {/* Transform into a TextArea */}
            <Controller
              control={control}
              name="description"
              render={() => <Input placeholder="Descrição do produto" />}
            />

            <HStack space={5}>
              <HStack alignItems="center" space={2}>
                <Checkbox
                  active={condition === "new"}
                  onPress={() => setCondition("new")}
                />
                <Text color="gray.200" fontFamily="body" fontSize="md">
                  Produto novo
                </Text>
              </HStack>

              <HStack alignItems="center" space={2}>
                <Checkbox
                  active={condition === "used"}
                  onPress={() => setCondition("used")}
                />
                <Text color="gray.200" fontFamily="body" fontSize="md">
                  Produto usado
                </Text>
              </HStack>
            </HStack>
          </VStack>

          <VStack px={6} space={3}>
            <Text color="gray.200" fontFamily="heading" fontSize="md">
              Venda
            </Text>

            {/* Create currency Input ? {Currency type locked before value} */}
            <Controller
              control={control}
              name="title"
              render={() => (
                <Input
                  keyboardType="number-pad"
                  placeholder="Valor do produto"
                />
              )}
            />
          </VStack>

          <VStack px={6} space={3}>
            <Text color="gray.200" fontFamily="heading" fontSize="md">
              Aceita troca?
            </Text>

            <Switch
              active={tradePreference}
              onPress={() => setTradePreference(prev => !prev)}
            />
          </VStack>

          <VStack px={6} space={3}>
            <Text color="gray.200" fontFamily="heading" fontSize="md">
              Meios de pagamento aceitos:
            </Text>
            <VStack space={2}>
              {PaymentMethods.map(item => {
                return (
                  <HStack alignItems="center" space={2} key={item}>
                    <Checkbox size={18} active={true} />

                    <Text color="gray.200" fontFamily="body" fontSize="md">
                      {item}
                    </Text>
                  </HStack>
                );
              })}
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>

      <HStack py={4} px={6} space={3} bgColor="white">
        <Button
          flexGrow={1}
          bgColor="gray.500"
          label="Cancelar"
          onPress={() => navigation.navigate("home")}
        />

        <Button
          flexGrow={1}
          bgColor="black"
          textColor="gray.700"
          label="Avançar"
        />
      </HStack>
    </VStack>
  );
}
