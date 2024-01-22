'use client';

import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { convertToDotNotation, readJS } from '@/action/translate';
import { useTranslateStore } from '@/store/translate';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_FILE_TYPES = ['text/javascript'];

const formSchema = z.object({
  file: z.instanceof(File),
});

export default function TranslateForm({
  title,
  desc,
  message,
}: {
  title: string;
  desc?: string;
  message: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: new File([], ''),
    },
  });
  const { setI18n, setFileName, clearI18n, clearFileName } =
    useTranslateStore();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!ACCEPTED_FILE_TYPES.includes(values?.file.type)) {
      form.setError('file', {
        type: 'custom',
        message: 'js 확장자를 가진 파일이어야 합니다.',
      });
      return;
    }
    try {
      const i18n = await readJS(values.file);
      const flattenI18n = convertToDotNotation(i18n);
      setI18n(flattenI18n);
      setFileName(values?.file.name);
    } catch (error) {
      form.setError('file', {
        type: 'custom',
        message: '파일 구조가 올바르지 않습니다.',
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{title}</FormLabel>
              <FormControl>
                <Input
                  id={title}
                  type="file"
                  className="file:rounded-md file:border file:border-solid"
                  onChange={(e) => {
                    if (e.target.files?.length === 0) {
                      return;
                    }
                    clearI18n();
                    clearFileName();
                    field.onChange(e.target.files ? e.target.files[0] : null);
                  }}
                />
              </FormControl>
              <FormDescription>{desc}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {message}
        </Button>
      </form>
    </Form>
  );
}
