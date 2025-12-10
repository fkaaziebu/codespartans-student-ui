import { create } from "zustand";

interface StoreData {
  isCartUpdated?: boolean;
}

interface DataStore {
  data: StoreData;
  setData: (data?: StoreData) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  data: {},
  setData: (data = {}) => set({ data }),
}));
