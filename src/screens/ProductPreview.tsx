import { useLayoutEffect, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";

import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { AppError } from "@utils/AppError";

import { ProductCondition } from "@dtos/ProductDTO";

import { api } from "@services/api";

import { Button, Currency, UserPhoto } from "@components/index";
import {
  HStack,
  ScrollView,
  StatusBar,
  Text,
  useTheme,
  useToast,
  View,
  VStack,
} from "native-base";

import {
  ArrowLeft,
  Bank,
  Barcode,
  CreditCard,
  Money,
  QrCode,
  Tag,
} from "phosphor-react-native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type RouteParams = {
  id: string;
};

export function ProductPreview() {
  const [productInfo, setProductInfo] = useState({});

  const Toast = useToast();
  const { colors } = useTheme();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();
  const params = route.params as RouteParams;

  const isFocused = useIsFocused();

  let isNew = false;

  const getProductCondition = (): ProductCondition => {
    let condition: Partial<ProductCondition>;
    if (isNew) {
      condition = "new";
    } else {
      condition = "used";
    }

    return condition;
  };

  const submitNewProduct = async () => {
    try {
      console.log({ PRODUCT: productInfo });
      navigation.navigate("myAds");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Desculpe, não foi possível contatar nossos servidores. Tente novamente mais tarde.";

      Toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  };

  const changeNavigationBarColor = async () => {
    await NavigationBar.setBackgroundColorAsync(colors.white);
    await NavigationBar.setButtonStyleAsync("dark");
  };

  useLayoutEffect(() => {
    changeNavigationBarColor();
  }, []);

  return (
    <>
      {/* Find a solution to the deferred bgColor when entering ou leaving this screen */}
      {isFocused && <StatusBar backgroundColor={colors.blue[100]} />}

      <VStack flex={1}>
        <View bgColor="blue.100" pt={8} px={6} pb={4}>
          <Text
            textAlign="center"
            color="gray.700"
            fontSize={16}
            fontFamily="heading"
          >
            Pré visualização do anúncio
          </Text>

          <Text
            textAlign="center"
            color="gray.700"
            fontSize={14}
            fontFamily="body"
          >
            É assim que seu produto vai aparecer!
          </Text>
        </View>

        <ScrollView
          alwaysBounceVertical={false}
          alwaysBounceHorizontal={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 26,
          }}
        >
          <VStack flex={1} space={5}>
            {/* Carroussel */}
            <View w="full" h={280} bgColor="black:alpha.50"></View>

            <VStack space={6}>
              <HStack px={6} space={2}>
                <UserPhoto
                  isLoading={!productInfo}
                  source={{ uri: "https://github.com/cdias900.png" }}
                  size={6}
                />

                <Text color="gray.100" fontFamily="body" fontSize="sm">
                  User name
                </Text>
              </HStack>

              <VStack space={2}>
                <View
                  py={0.5}
                  px={2}
                  ml={6}
                  alignSelf="flex-start"
                  alignItems="center"
                  justifyContent="center"
                  bgColor="gray.500"
                  rounded="full"
                >
                  <Text
                    textAlign="center"
                    color="gray.200"
                    fontFamily="heading"
                    fontSize={10}
                  >
                    {getProductCondition().toUpperCase()}
                  </Text>
                </View>

                <HStack
                  alignItems="center"
                  justifyContent="space-between"
                  px={6}
                >
                  <Text color="gray.100" fontFamily="heading" fontSize="lg">
                    Bicicleta velha
                  </Text>

                  <Currency price={120.0} color="blue.100" />
                </HStack>

                <View px={6}>
                  <Text color="gray.200" fontFamily="body" fontSize="sm">
                    Cras congue cursus in tortor sagittis placerat nunc, tellus
                    arcu. Vitae ante leo eget maecenas urna mattis cursus.
                    Mauris metus amet nibh mauris mauris accumsan, euismod.
                    Aenean leo nunc, purus iaculis in aliquam.
                  </Text>
                </View>
              </VStack>

              <VStack px={6} space={4}>
                <HStack space={2}>
                  <Text color="gray.200" fontFamily="heading" fontSize="sm">
                    Aceita troca?
                  </Text>
                  <Text color="gray.200" fontFamily="body" fontSize="sm">
                    {"Sim"}
                  </Text>
                </HStack>

                <VStack space={2}>
                  <Text color="gray.200" fontFamily="heading" fontSize="sm">
                    Meios de pagamento:
                  </Text>

                  <VStack space={1}>
                    <HStack alignItems="center" space={2}>
                      <Barcode size={18} />
                      <Text fontFamily="body" fontSize="sm">
                        Boleto
                      </Text>
                    </HStack>

                    <HStack alignItems="center" space={2}>
                      <QrCode size={18} />
                      <Text fontFamily="body" fontSize="sm">
                        Pix
                      </Text>
                    </HStack>

                    <HStack alignItems="center" space={2}>
                      <Money size={18} />
                      <Text fontFamily="body" fontSize="sm">
                        Dinheiro
                      </Text>
                    </HStack>

                    <HStack alignItems="center" space={2}>
                      <CreditCard size={18} />
                      <Text fontFamily="body" fontSize="sm">
                        Cartão de crédito
                      </Text>
                    </HStack>

                    <HStack alignItems="center" space={2}>
                      <Bank size={18} />
                      <Text fontFamily="body" fontSize="sm">
                        Depósito Bancário
                      </Text>
                    </HStack>
                  </VStack>
                </VStack>
              </VStack>
            </VStack>
          </VStack>
        </ScrollView>

        <HStack
          alignItems="center"
          justifyContent="space-between"
          py={5}
          px={6}
          bgColor="white"
          space={4}
        >
          <Button
            flex={1}
            bgColor="gray.500"
            textColor="gray.200"
            label="Voltar e editar"
            onPress={() => navigation.navigate("createAd")}
          >
            <ArrowLeft color={colors.gray[200]} size={16} />
          </Button>

          <Button
            flex={1}
            bgColor="blue.100"
            textColor="gray.700"
            label="Publicar"
            onPress={submitNewProduct}
          >
            <Tag color={colors.gray[700]} size={16} />
          </Button>
        </HStack>
      </VStack>
    </>
  );
}
