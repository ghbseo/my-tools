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

export default function PreviewToolbar({
  type = 'js',
}: {
  type?: 'js' | 'excel';
}) {
  const {
    i18n,
    fileNameJS,
    fileNameExcel,
    rows,
    clearI18n,
    clearFileName,
    clearRows,
  } = useTranslateStore();

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

    xlsx.utils.book_append_sheet(wb, ws, fileNameJS);
    xlsx.writeFile(wb, `${fileNameJS}.xlsx`);
  }, [i18n, fileNameJS]);
  return (
    <div className="flex flex-row items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={'ghost'}
            className="absolute"
            onClick={() => {
              if (type === 'js') {
                clearI18n();
              } else {
                clearRows();
              }
              clearFileName(type);
            }}
          >
            <ChevronLeft />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>뒤로가기</p>
        </TooltipContent>
      </Tooltip>
      <h1 className="mx-auto text-xl font-bold">
        {type === 'js' ? fileNameJS : fileNameExcel}
      </h1>
      {type === 'js' ? (
        <Button onClick={handleDownload}>다운로드</Button>
      ) : (
        <div></div>
      )}
    </div>
  );
}
