import { create } from "zustand";

interface useAttributionModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAttributionModal = create<useAttributionModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
