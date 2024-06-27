import { useEffect, useState } from "react";
import { getUser } from "../api/users";

interface userInterface {
  id: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  fullname: string;
  picture: string;
}

export const useLogin = () => {
  const [user, setUser] = useState<userInterface>({
    id: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    fullname: "",
    picture: "",
  });

  useEffect(() => {
    getUsername();
  }, []);

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
