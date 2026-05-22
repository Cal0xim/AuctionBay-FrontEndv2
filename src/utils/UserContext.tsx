import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

type User = {
  id: number;
  username: string;
  image: string | null;
};

type UserContextType = {
  user: User | null;
  refreshUser: () => Promise<void>;
  setUser: (user: User) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const refreshUser = async () => {
    const res = await api.get("/me");
    setUser(res.data);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, refreshUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
}