import { createContext, useState } from "react";

import { UserDTO } from "@dtos/index";

type AuthContextType = {
  user: UserDTO;
};

type AuthProviderType = {
  children: React.ReactNode;
};

export const AuthContext = createContext({
  user: {},
} as AuthContextType);

export function AuthProvider({ children }: AuthProviderType) {
  const [user, setUser] = useState({} as UserDTO);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
