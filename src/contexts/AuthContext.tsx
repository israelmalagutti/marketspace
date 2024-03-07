import { createContext, useEffect, useState } from "react";

import { api } from "@services/api";

import { UserDTO } from "@dtos/index";
import { getUser, removeUser, saveUser } from "@storage/storageUser";
import { removeAuthToken, saveAuthToken } from "@storage/storageAuthToken";

type AuthContextType = {
  user: UserDTO;

  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;

  isLoadingStoredUser: boolean;
};

type AuthProviderType = {
  children: React.ReactNode;
};

export const AuthContext = createContext({
  user: {},
} as AuthContextType);

export function AuthProvider({ children }: AuthProviderType) {
  const [user, setUser] = useState({} as UserDTO);

  const [isLoadingStoredUser, setIsLoadingStoredUser] = useState(false);

  const storageUser = async (userData: UserDTO, token: string) => {
    try {
      setIsLoadingStoredUser(true);

      await saveUser(userData);
      await saveAuthToken(token);
    } catch (error) {
      throw error;
    }
  };

  const updateUserAndToken = async (userData: UserDTO, token: string) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    setUser(userData);
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/sessions", { email, password });

      if (data.user && data.token) {
        await storageUser(data.user, data.token);
        updateUserAndToken(data.user, data.token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStoredUser(false);
    }
  };

  const signOut = async () => {
    try {
      await removeAuthToken();
      await removeUser();
      setUser({} as UserDTO);
    } catch (error) {
      throw error;
    }
  };

  const loadUserData = async () => {
    try {
      setIsLoadingStoredUser(true);

      const loggedUser = await getUser();

      if (loggedUser) setUser(loggedUser);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStoredUser(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoadingStoredUser, user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
