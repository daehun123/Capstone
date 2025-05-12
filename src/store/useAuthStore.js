import { create } from "zustand";

const useAuthStore = create((set) => ({
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  isLoggedIn: !!localStorage.getItem("accessToken"),

  login: (access, refresh) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    set({
      accessToken: access,
      refreshToken: refresh,
      isLoggedIn: true,
    });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({ accessToken: null, refreshToken: null, isLoggedIn: false });
  },

  setAccessToken: (access) => {
    localStorage.setItem("accessToken", access);
    set({ accessToken: access, isLoggedIn: true });
  },
}));

export default useAuthStore;
