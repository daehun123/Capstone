import { create } from "zustand";

const useUserDataStore = create((set) => ({
  info: [],
  setInfo: (data) => set({ info: data }),
}));
export default useUserDataStore;
