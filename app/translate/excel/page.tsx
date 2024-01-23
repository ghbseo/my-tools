'use client';

import TranslateForm from '@/components/translate/translate-form';
import { useTranslateStore } from '@/store/translate';
import PreviewToolbar from '@/components/translate/preview-toolbar';
import PreviewJS from '@/components/translate/preview-js';

export default function Page() {
  const { rows } = useTranslateStore();
  return (
    <main className="flex h-full p-4">
      {rows.length === 0 && (
        <div className="flex w-full items-center justify-center">
          <TranslateForm
            title=".xlsx 파일 변환하기"
            message="변환 시작"
            type="excel"
          />
        </div>
      )}
      {rows.length > 0 && (
        <div className="flex w-full flex-col gap-2">
          <PreviewToolbar type="excel" />
          <PreviewJS />
        </div>
      )}
    </main>
  );
}
