import { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { AppError } from "@utils/AppError";

import { api } from "@services/api";

import { ProductDTO } from "@dtos/ProductDTO";

import { Header, MyAdsCard, ProductCard, SearchBar } from "@components/index";
import { FlatList, Text, VStack, useToast } from "native-base";

const PRODUCTS: ProductDTO[] = [
  {
    id: "1",
    user_id: "1",

    name: "Tênis Vermelho",
    description: "Another random Item",
    price: "59.90",

    acceptTrade: false,
    isNew: false,

    thumb: "none",
  },
  {
    id: "2",
    user_id: "2",

    name: "Bicicleta",
    description: "Random Item",
    price: "120.00",

    acceptTrade: true,
    isNew: true,

    thumb: "none",
  },
  {
    id: "3",
    user_id: "1",

    name: "Tênis Azul",
    description: "Another random Item",
    price: "159.90",

    acceptTrade: false,
    isNew: true,

    thumb: "none",
  },
  {
    id: "4",
    user_id: "2",

    name: "Monociclo",
    description: "Random Item",
    price: "120.00",

    acceptTrade: true,
    isNew: false,

    thumb: "none",
  },
  {
    id: "5",
    user_id: "1",

    name: "Tênis Vermelho",
    description: "Another random Item",
    price: "59.90",

    acceptTrade: false,
    isNew: false,

    thumb: "none",
  },
  {
    id: "6",
    user_id: "2",

    name: "Bicicleta",
    description: "Random Item",
    price: "120.00",

    acceptTrade: true,
    isNew: true,

    thumb: "none",
  },
  {
    id: "7",
    user_id: "1",

    name: "Tênis Azul",
    description: "Another random Item",
    price: "159.90",

    acceptTrade: false,
    isNew: true,

    thumb: "none",
  },
  {
    id: "8",
    user_id: "2",

    name: "Monociclo",
    description: "Random Item",
    price: "120.00",

    acceptTrade: true,
    isNew: false,

    thumb: "none",
  },
];

export function Home() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    isNew: false,
    acceptTrade: false,
    paymentMethods: ["pix"],
    query: "",
  });

  const Toast = useToast();

  const navigation = useNavigation();

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products", {
        maxRedirects: 4,
        params: {
          is_new: filters.isNew,
          accept_trade: filters.acceptTrade,
          payment_methods: filters.paymentMethods,
          query: filters.query,
        },
      });

      console.log({ data });

      if (data) setProducts(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Algo deu errado. Tente novamente mais tarde.";

      Toast.show({
        title,
        placement: "top",
        bgColor: "red.600",
      });
    }
  };

  useEffect(() => {
    // fetchProducts();
    console.log({ products });
  }, []);

  return (
    <VStack space={8}>
      <Header />

      <VStack px={6} space={3}>
        <Text color="gray.300" fontFamily="body" fontSize="sm">
          Seus produtos anunciados para venda
        </Text>

        <MyAdsCard numberOfAds={4} />
      </VStack>

      <VStack px={6} space={3}>
        <Text color="gray.300" fontFamily="body" fontSize="sm">
          Compre produtos variados
        </Text>

        <SearchBar />
      </VStack>

      {/* Transform into infinite scroll */}
      <FlatList
        alwaysBounceVertical={false}
        alwaysBounceHorizontal={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingBottom: 400,
          rowGap: 24,
        }}
        columnWrapperStyle={{ gap: 24 }}
        numColumns={2}
        data={PRODUCTS ?? products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ProductCard {...item} />}
      />
    </VStack>
  );
}
