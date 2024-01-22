import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export default function PreviewTable({ i18n }: { i18n: object }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>키</TableHead>
          <TableHead>값</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(i18n).map(([key, value], index) => (
          <TableRow key={index}>
            <TableCell>{key}</TableCell>
            <TableCell>{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
