import { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { api } from "@services/api";

import { AppError } from "@utils/AppError";

import { Button, Input, UserPhoto } from "@components/index";
import { Center, ScrollView, Text, VStack, useToast } from "native-base";

import LogoIcon from "@assets/logoIcon.svg";
import { useAuth } from "@hooks/useAuth";

type Avatar = {
  name: string;
  uri: string;
  type: string;
};

type FormData = {
  name: string;
  email: string;
  telephone: string;
  password: string;
  confirm_password: string;
};

const signUpSchema = z
  .object({
    name: z.string({ required_error: "This field is required." }),
    email: z
      .string({ required_error: "This field is required." })
      .email("Invalid email."),
    telephone: z.string({ required_error: "This field is required." }),
    password: z.string({ required_error: "This field is required." }),
    confirm_password: z.string({ required_error: "This field is required." }),
  })
  .refine(data => data.password === data.confirm_password, {
    message: "The passwords must match.",
    path: ["confirmPassword"],
  });

const PHOTO_SIZE = 88;

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const [avatar, setAvatar] = useState<Avatar>({} as Avatar);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const { signIn } = useAuth();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { control, formState, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });

  const Toast = useToast();

  const handleSelectedAvatar = async () => {
    setAvatarLoading(true);

    try {
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      const { uri } = selectedPhoto.assets![0];

      if (selectedPhoto.canceled) return;

      if (uri) {
        const photoInfo = await FileSystem.getInfoAsync(uri, { size: true });

        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5)
          throw new AppError("A imagem deve ser menor do que 5MB");

        const fileExtension = uri.split(".").pop();

        const photoFile = {
          name: `avatar.${fileExtension}`,
          uri,
          type: `${selectedPhoto.assets[0].type}/${fileExtension}`,
        };

        setAvatar(photoFile);
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Algo deu errado, tente novamente mais tarde.";

      Toast.show({
        title,
        placement: "top",
        bgColor: "red.600",
      });
    } finally {
      setAvatarLoading(false);
    }
  };

  const submitSignUp = async ({
    email,
    name,
    telephone,
    password,
  }: FormData) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("avatar", avatar as any);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("tel", telephone);
      formData.append("password", password);

      await api.post("/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      signIn(email, password);
    } catch (error) {
      setIsLoading(false);

      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Desculpe, não foi possível contatar nossos servidores. Tente novamente mais tarde.";

      Toast.show({
        title,
        placement: "top",
        bgColor: "red.600",
      });
    }
  };

  const handleSignIn = () => {
    navigation.navigate("signUp");
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
              <UserPhoto
                size={24}
                isEditable
                isLoading={avatarLoading}
                onPress={handleSelectedAvatar}
                source={
                  avatar.uri
                    ? {
                        uri: avatar.uri,
                      }
                    : undefined
                }
              />
            </Center>

            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input
                  placeholder="Nome"
                  autoCapitalize="words"
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={formState.errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  placeholder="Email"
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
              name="telephone"
              render={({ field }) => (
                <Input
                  placeholder="Telefone"
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={formState.errors.telephone?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input
                  placeholder="Password"
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={formState.errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirm_password"
              render={({ field }) => (
                <Input
                  secure
                  placeholder="Confirmar Senha"
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={formState.errors.confirm_password?.message}
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit(submitSignUp)}
                />
              )}
            />
          </VStack>

          <Button
            label="Criar"
            isLoading={isLoading}
            onPress={handleSubmit(submitSignUp)}
            bgColor="black"
            textColor="gray.700"
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
