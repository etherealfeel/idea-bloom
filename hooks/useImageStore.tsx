import { create } from 'zustand';

type ImageStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useImageStore = create<ImageStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
