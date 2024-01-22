import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTranslateStore } from '@/store/translate';
import { useCallback } from 'react';
import * as xlsx from 'xlsx';

export default function PreviewToolbar() {
  const { i18n, fileName, clearI18n } = useTranslateStore();

  const handleDownload = useCallback(() => {
    const i18nArray = [];
    for (const [key, value] of Object.entries(i18n)) {
      i18nArray.push({
        key: key,
        value: value,
      });
    }
    const ws = xlsx.utils.json_to_sheet(i18nArray);
    const wb = xlsx.utils.book_new();

    const wscols = [{ wch: 50 }, { wch: 300 }];

    ws['!cols'] = wscols;

    xlsx.utils.book_append_sheet(wb, ws, fileName);
    xlsx.writeFile(wb, `${fileName}.xlsx`);
  }, [i18n, fileName]);
  return (
    <div className="flex flex-row items-center justify-between">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={'ghost'}
            onClick={() => {
              clearI18n();
            }}
          >
            <ChevronLeft />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>뒤로가기</p>
        </TooltipContent>
      </Tooltip>
      <h1 className="text-xl font-bold">{fileName}</h1>
      <Button onClick={handleDownload}>다운로드</Button>
    </div>
  );
}
