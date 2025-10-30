import styles from './DataTable.module.css';
import { Pencil, Trash } from 'lucide-react';

export type TableColumn<T> = {
  key: keyof T;
  label: string;
  render?: (item: T) => React.ReactNode;
};

type Props<T> = {
  data: T[];
  columns: TableColumn<T>[];
  withActions?: boolean;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
};

export default function DataTable<T>({
  data,
  columns,
  withActions = false,
  onEdit,
  onDelete,
}: Props<T>) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)}>{col.label}</th>
          ))}
          {withActions && <th>Ações</th>}
        </tr>
      </thead>
      <tbody>
        {data?.length > 0 && data.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? styles.even : styles.odd}>
            {columns.map((col) => (
              <td key={String(col.key)}>
                {col.render ? col.render(row) : (row[col.key] as React.ReactNode)}
              </td>
            ))}
            {withActions && (
              <td className={styles.actions}>
                {onEdit && (
                  <button className={styles.editButton} onClick={() => onEdit(row)} title="Editar">
                    <Pencil size={16} />
                  </button>
                )}
                {onDelete && (
                  <button onClick={() => onDelete(row)} title="Remover">
                    <Trash size={16} />
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
