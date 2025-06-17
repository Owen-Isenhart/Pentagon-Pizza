import { create } from 'zustand';

export type Pizza = {
  name: string;
  address: string;
  distance: number;
  status: string;
  link: string;
  lat: number;
  lng: number;
};

interface AppState {
  tickerData: Pizza[];
  setTickerData: (data: Pizza[]) => void;
}

export const useAppStore = create<AppState>((set: (partial: Partial<AppState>) => void) => ({
  tickerData: [],
  setTickerData: (data: Pizza[]) => set({ tickerData: data }),
}));
