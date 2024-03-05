import { UserDTO } from "@dtos/UserDTO";

import { USER_STORAGE } from "./storageConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function saveUser(user: UserDTO) {
  try {
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
  } catch (error) {
    throw error;
  }
}

async function getUser() {
  try {
    const storedUser = await AsyncStorage.getItem(USER_STORAGE);

    const user: UserDTO = storedUser ? JSON.parse(storedUser) : {};
    return user;
  } catch (error) {
    throw error;
  }
}

async function removeUser() {
  try {
    await AsyncStorage.removeItem(USER_STORAGE);
  } catch (error) {
    throw error;
  }
}

export { getUser, removeUser, saveUser };
