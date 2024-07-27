import { useEffect, useState } from "react";
import { getUser } from "../api/users";
import { useAuth } from "./useAuth";

interface userInterface {
  user_id: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  fullname: string;
  picture: string;
}

export const useLogin = () => {
  const { token } = useAuth();
  const [user, setUser] = useState<userInterface>({
    user_id: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    fullname: "",
    picture: "",
  });

  useEffect(() => {
    getUsername();
  }, [token]);

  async function getUsername() {
    try {
      const response = (await getUser()).data;
      setUser(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  }

  return user;
};
