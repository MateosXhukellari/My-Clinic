import { create } from "zustand";

type Role = "patient" | "admin";

type AuthState = {
  role: Role | null;
  setRole: (r: Role) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
  logout: () => set({ role: null }),
}));
