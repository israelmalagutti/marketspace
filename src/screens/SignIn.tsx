import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { useAuth } from "@hooks/useAuth";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Input, Button } from "@components/index";
import { Box, Center, ScrollView, Text, VStack, useToast } from "native-base";

import Logo from "@assets/logo.svg";
import LogoIcon from "@assets/logoIcon.svg";
import { AppError } from "@utils/AppError";

type FormData = {
  email: string;
  password: string;
};

const signInSchema = z.object({
  email: z
    .string({ required_error: "This field is required." })
    .email("Invalid email."),
  password: z.string({ required_error: "This field is required." }),
});

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const Toast = useToast();

  const { signIn } = useAuth();

  const { control, formState, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(signInSchema),
  });

  const handleSignUp = () => {
    navigation.navigate("signUp");
  };

  const submitSignIn = async ({ email, password }: FormData) => {
    try {
      setIsLoading(true);

      await signIn(email, password);
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
    } finally {
      setIsLoading(false);
    }
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
          roundedBottom={24}
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

            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={formState.errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input
                  secure
                  placeholder="Senha"
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={formState.errors.password?.message}
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit(submitSignIn)}
                />
              )}
            />
          </VStack>

          <Button
            bgColor="blue.100"
            textColor="gray.700"
            label="Entrar"
            isLoading={isLoading}
            onPress={handleSubmit(submitSignIn)}
          />
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
