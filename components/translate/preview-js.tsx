import { unFlatten } from '@/action/translate';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Copy, Check } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select';

export default function PreviewJS({
  excel,
}: {
  excel: { [key: string]: any };
}) {
  const [sheet, setSheet] = useState('');
  const [sheetKey, setSheetKey] = useState('');
  const [sheetValue, setSheetValue] = useState('');
  const [jsonString, setJsonString] = useState('');
  const codeRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (!sheetValue) return;
    try {
      const obj = unFlatten(excel[sheet], sheetKey, sheetValue);
      const temp = JSON.stringify(obj, null, 4);
      setJsonString(temp.replace(/"([^"]+)":/g, '$1:'));
    } catch (error) {}
  }, [sheetValue, excel, sheet, sheetKey]);

  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  }, [copied]);

  return (
    <div className="flex h-[calc(100%-28px)] flex-col gap-2">
      <div className="grid grid-cols-3 gap-2">
        <div>
          <h1 className="text-xl font-bold">시트</h1>
          <Select value={sheet} onValueChange={setSheet}>
            <SelectTrigger>
              <SelectValue placeholder="시트를 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(excel).map((key, index) => (
                <SelectItem key={index} value={key}>
                  {key}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {sheet && (
          <div>
            <h1 className="text-xl font-bold">키</h1>
            <Select value={sheetKey} onValueChange={setSheetKey}>
              <SelectTrigger>
                <SelectValue placeholder="키를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(excel[sheet][0]).map((key, index) => (
                  <SelectItem key={index} value={key}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {sheet && sheetKey && (
          <div>
            <h1 className="text-xl font-bold">값</h1>
            <Select
              value={sheetValue}
              onValueChange={(value: string) => {
                setSheetValue(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="값을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(excel[sheet][0]).map((key, index) => (
                  <SelectItem key={index} value={key}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <ScrollArea className="h-auto min-h-[72px] rounded-md border p-4">
        <Button
          className="absolute right-4 top-4"
          onClick={async () => {
            const copyText = codeRef.current?.textContent ?? '';
            try {
              await navigator.clipboard.writeText(copyText);
              setCopied(true);
            } catch (error) {}
          }}
        >
          <Copy className={cn('w-4 scale-100', copied && 'scale-0')} />
          <Check
            className={cn('absolute w-4 scale-0', copied && 'scale-100')}
          />
        </Button>
        <pre ref={codeRef}>{jsonString}</pre>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
