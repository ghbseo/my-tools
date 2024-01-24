import { create } from 'zustand';

type TranslateStore = {
  i18n: object;
  fileNameJS: string;
  excel: object;
  fileNameExcel: string;
  // rows: Array<{ key: string; value: string }>;
  setI18n: (i18n: object) => void;
  clearI18n: () => void;
  setFileName: (name: string, target: 'js' | 'excel') => void;
  clearFileName: (target: 'js' | 'excel') => void;
  setExcel: (excel: object) => void;
  clearExcel: () => void;
};

export const useTranslateStore = create<TranslateStore>()((set) => ({
  i18n: {},
  fileNameJS: '',
  excel: {},
  fileNameExcel: '',
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
  setExcel: (excel) => set(() => ({ excel: excel })),
  clearExcel: () => set(() => ({ excel: {} })),
  // setRows: (rows) => set(() => ({ rows: rows })),
  // clearRows: () => set(() => ({ rows: [] })),
}));
