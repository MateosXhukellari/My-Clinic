import { create } from "zustand";

type UploadState = {
  file: File | null;
  setFile: (f: File) => void;
  reset: () => void;
};

export const useUploadStore = create<UploadState>((set) => ({
  file: null,
  setFile: (f: File) => set({ file: f }),
  reset: () => set({ file: null }),
}));
