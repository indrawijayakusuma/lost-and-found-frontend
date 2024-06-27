/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginUser } from "@/api/auths";
import { createContext, useEffect, useState } from "react";

interface props {
  children: React.ReactNode;
}

interface Credential {
  phone: string;
  password: string;
}

interface contextInterface {
  token: any;
  login: (credential: Credential) => Promise<boolean>;
  logout: any;
}

export const AuthContext = createContext<contextInterface | undefined>(
  undefined
);

export const AuthContextProvider = ({ children }: props) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = async (credential: Credential) => {
    try {
      const response = await loginUser(credential);
      setToken(response.data.data.accessToken);
      localStorage.setItem("token", response.data.data.accessToken);
      return true;
    } catch (e: any) {
      console.log(e.response);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
