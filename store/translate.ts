import { create } from 'zustand';

type TranslateStore = {
  i18n: object;
  fileNameJS: string;
  fileNameExcel: string;
  rows: Array<object>;
  setI18n: (i18n: object) => void;
  clearI18n: () => void;
  setFileName: (name: string, target: 'js' | 'excel') => void;
  clearFileName: (target: 'js' | 'excel') => void;
  setRows: (rows: Array<object>) => void;
  clearRows: () => void;
};

export const useTranslateStore = create<TranslateStore>()((set) => ({
  i18n: {},
  fileNameJS: '',
  fileNameExcel: '',
  rows: [],
  setI18n: (param) => set(() => ({ i18n: param })),
  clearI18n: () => set(() => ({ i18n: {} })),
  setFileName: (name, target) =>
    set(() => {
      if (target === 'js') {
        return { fileNameJS: name };
      }
      return { fileNameExcel: name };
    }),
  clearFileName: (target) =>
    set(() => {
      if (target === 'js') {
        return { fileNameJS: '' };
      }
      return { fileNameExcel: '' };
    }),
  setRows: (rows) => set(() => ({ rows: rows })),
  clearRows: () => set(() => ({ rows: [] })),
}));
