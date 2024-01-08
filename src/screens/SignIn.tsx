import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { Input, Button } from "@components/index";
import { Box, Center, ScrollView, Text, VStack } from "native-base";

import Logo from "@assets/logo.svg";
import LogoIcon from "@assets/logoIcon.svg";

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const handleSignUp = () => {
    navigation.navigate("signUp");
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack
        flex={1}
        pb="16"
        px={12}
        position={"relative"}
        justifyContent="space-between"
        backgroundColor="white"
      >
        <Box
          h="80%"
          position="absolute"
          zIndex={-1}
          top={0}
          right={0}
          left={0}
          backgroundColor="gray.600"
          borderRadius={24}
        />

        <VStack alignItems="center" space={5} py={18}>
          <Center>
            <LogoIcon />
          </Center>

          <Box>
            <Logo />
            <Text color="gray.300" fontFamily="body" fontSize={14}>
              Seu espaço de compra e venda
            </Text>
          </Box>
        </VStack>

        <VStack space={8}>
          <VStack space={4}>
            <Text textAlign="center" fontFamily="body">
              Acesse sua conta
            </Text>

            <Input placeholder="E-mail" />

            <Input secure placeholder="Senha" />
          </VStack>

          <Button bgColor="blue.100" textColor="gray.700" label="Entrar" />
        </VStack>

        <VStack space={4}>
          <Text textAlign="center" fontFamily="body" fontSize="sm">
            Ainda não tem acesso?
          </Text>

          <Button color="gray.500" label="Criar conta" onPress={handleSignUp} />
        </VStack>
      </VStack>
    </ScrollView>
  );
}
