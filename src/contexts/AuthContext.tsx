import { createContext, useState } from "react";

import { api } from "@services/api";

import { UserDTO } from "@dtos/index";
import { saveUser } from "@storage/storageUser";

type AuthContextType = {
  user: UserDTO;

  signIn: (email: string, password: string) => Promise<void>;
};

type AuthProviderType = {
  children: React.ReactNode;
};

export const AuthContext = createContext({
  user: {},
} as AuthContextType);

export function AuthProvider({ children }: AuthProviderType) {
  const [user, setUser] = useState({} as UserDTO);

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/sessions", { email, password });

      if (data.user && data.token) {
        await saveUser(data.user);
        api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

        setUser(data.user);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
