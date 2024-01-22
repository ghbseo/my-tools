import { create } from 'zustand';

type TranslateStore = {
  i18n: object;
  fileName: string;
  setI18n: (i18n: object) => void;
  setFileName: (name: string) => void;
  clearI18n: () => void;
  clearFileName: () => void;
};

export const useTranslateStore = create<TranslateStore>()((set) => ({
  i18n: {},
  fileName: '',
  setI18n: (param) => set(() => ({ i18n: param })),
  setFileName: (name) => set(() => ({ fileName: name })),
  clearI18n: () => set(() => ({ i18n: {} })),
  clearFileName: () => set(() => ({ fileName: '' })),
}));
