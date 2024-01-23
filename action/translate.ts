import * as xlsx from 'xlsx';

export async function readJS(file: File): Promise<object> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      let result = e.target?.result as string;
      result = result.replace(/(^[^{]*)/g, '').replace(/;(?=[^;]*$)/g, '');

      const fileValue = Function(`return ${result}`)();
      resolve(fileValue);
    };
    reader.readAsText(file, 'utf-8');
    reader.onerror = reject;
  });
}

function flattenDict(data: object, parentKey = '', sep = '.') {
  const items: [string, any][] = [];
  for (const [k, v] of Object.entries(data)) {
    const newKey = parentKey ? `${parentKey}${sep}${k}` : k;

    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      items.push(...Object.entries(flattenDict(v, newKey, sep)));
    } else {
      items.push([newKey, v]);
    }
  }

  return Object.fromEntries(items);
}

export function convertToDotNotation(jsObject: object): object {
  const flattenedObject = flattenDict(jsObject);
  return Object.fromEntries(Object.entries(flattenedObject));
}

export async function readExcel(file: File): Promise<object> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      const wb = xlsx.read(result, { type: 'buffer' });

      const rows: { [key: string]: object } = {};
      wb.SheetNames.forEach((sheetName) => {
        const rowObj = xlsx.utils.sheet_to_json(wb.Sheets[sheetName]);
        rows[sheetName] = rowObj;
      });
      resolve(rows);
    };
    reader.readAsArrayBuffer(file);
    reader.onerror = reject;
  });
}
