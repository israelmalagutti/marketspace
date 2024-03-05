import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_STORAGE } from "./storageConfig";

async function saveAuthToken(token: string) {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);
  } catch (error) {
    throw error;
  }
}

async function getAuthToken() {
  try {
    await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
  } catch (error) {
    throw error;
  }
}

async function removeAuthToken() {
  try {
    await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
  } catch (error) {
    throw error;
  }
}

export { getAuthToken, removeAuthToken, saveAuthToken };
