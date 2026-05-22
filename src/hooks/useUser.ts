import { useEffect, useState } from "react";
import api from "../api/axios";

type User = {
  id: number;
  username: string;
};

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await api.get("/me");
      setUser(res.data);
    };

    fetchUser();
  }, []);

  return user;
}