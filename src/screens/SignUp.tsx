import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { Button, Input, UserPhoto } from "@components/index";
import { Center, ScrollView, Text, VStack } from "native-base";

import LogoIcon from "@assets/logoIcon.svg";

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const handleSignIn = () => {
    navigation.navigate("signIn");
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} pt={5} pb={16}>
        <VStack mb={12}>
          <Center pb={3}>
            <LogoIcon width={60} />
          </Center>

          <VStack space={2}></VStack>
          <Text
            color="gray.100"
            textAlign="center"
            fontFamily="heading"
            fontSize="lg"
          >
            Boas vindas!
          </Text>

          <Text
            numberOfLines={2}
            color="gray.200"
            textAlign="center"
            fontFamily="body"
            fontSize="md"
          >
            Crie sua conta e use o espaço para comprar
            {"\n"}
            itens variados e vender seus produtos
          </Text>
        </VStack>

        <VStack px={12} space={6}>
          <VStack space={4}>
            <Center>
              <UserPhoto size={88} />
            </Center>

            <Input placeholder="Nome" />
            <Input placeholder="Email" />
            <Input placeholder="Telefone" />
            <Input secure placeholder="Senha" />
            <Input secure placeholder="Confirmar Senha" />
          </VStack>

          <Button
            bgColor="black"
            textColor="gray.700"
            label="Criar"
            onPress={() => {}}
            mb={12}
          />
        </VStack>

        <VStack px={12} space={4}>
          <Text color="gray.200" textAlign="center" fontFamily="body">
            Já tem uma conta?
          </Text>

          <Button label="Ir para o login" onPress={handleSignIn} />
        </VStack>
      </VStack>
    </ScrollView>
  );
}
