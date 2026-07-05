import { create } from "zustand";

interface StoreData {
  isCartUpdated?: boolean;
}

interface PaywallState {
  open: boolean;
  message: string;
}

interface DataStore {
  data: StoreData;
  setData: (data?: StoreData) => void;
  paywall: PaywallState;
  openPaywall: (message: string) => void;
  closePaywall: () => void;
}

export const useDataStore = create<DataStore>((set) => ({
  data: {},
  setData: (data = {}) => set({ data }),
  paywall: { open: false, message: "" },
  openPaywall: (message) => set({ paywall: { open: true, message } }),
  closePaywall: () => set({ paywall: { open: false, message: "" } }),
}));
