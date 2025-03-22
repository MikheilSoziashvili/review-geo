import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  name: string;
  email: string;
};

type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      login: (user) => set({ isLoggedIn: true, user }),
      logout: () => set({ isLoggedIn: false, user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
