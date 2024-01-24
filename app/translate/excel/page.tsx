'use client';

import PreviewJS from '@/components/translate/preview-js';
import PreviewToolbar from '@/components/translate/preview-toolbar';
import TranslateForm from '@/components/translate/translate-form';
import { useTranslateStore } from '@/store/translate';

export default function Page() {
  const { excel } = useTranslateStore();

  return (
    <main className="flex h-full p-4">
      {Object.keys(excel).length === 0 && (
        <div className="flex w-full items-center justify-center">
          <TranslateForm
            title=".xlsx 파일 변환하기"
            message="변환 시작"
            type="excel"
          />
        </div>
      )}
      {Object.keys(excel).length > 0 && (
        <div className="flex h-full w-full flex-col gap-2">
          <PreviewToolbar type="excel" />
          <PreviewJS excel={excel} />
        </div>
      )}
    </main>
  );
}
