'use client';

import TranslateForm from '@/components/translate/translate-form';
import PreviewTable from '@/components/translate/preview-table';
import { useTranslateStore } from '@/store/translate';
import { ScrollArea } from '@/components/ui/scroll-area';
import PreviewToolbar from '@/components/translate/preview-toolbar';

export default function Page() {
  const { i18n } = useTranslateStore();
  return (
    <main className="flex h-full p-4">
      {Object.keys(i18n).length === 0 && (
        <div className="flex w-full items-center justify-center">
          <TranslateForm
            title=".js 파일에서 .xlsx 로 변환하기"
            message="변환 시작"
          />
        </div>
      )}
      {Object.keys(i18n).length > 0 && (
        <div className="flex flex-col gap-2">
          <PreviewToolbar />
          <ScrollArea className="h-auto">
            <PreviewTable i18n={i18n} />
          </ScrollArea>
        </div>
      )}
    </main>
  );
}
