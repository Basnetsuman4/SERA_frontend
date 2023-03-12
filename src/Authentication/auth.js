import { create } from "zustand";

export const useAuth = create((set) => ({
  accesstoken: null,
  role: null,
  username: null,
  isauthenticated: false,
  message: null,
  amountpaid: null,
  description: null,
  setAuthenticated: (value) => set({ isauthenticated: value }),
  setToken: (value) => set({ accesstoken: value }),
  setRole: (value) => set({ role: value }),
  setUser: (value) => set({ username: value }),
  setMessage: (value) => set({ message: value }),
  setAmount: (value) => set({ amountpaid: value }),
  setDescription: (value) => set({ description: value }),
}));
