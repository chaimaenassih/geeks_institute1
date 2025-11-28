import React, { useMemo, useState } from "react";

export interface TableColumn<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

type SortDirection = "asc" | "desc";

interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

interface DataTableProps<T extends { id: string | number }> {
  data: T[];
  columns: TableColumn<T>[];
  onSelect?: (selectedItems: T[]) => void;
}

function DataTable<T extends { id: string | number }>({
  data,
  columns,
  onSelect,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(
    null
  );
  const [selectedIds, setSelectedIds] = useState<
    Set<string | number>
  >(new Set());

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    const sorted = [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal === bVal) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      return sortConfig.direction === "asc" ? 1 : -1;
    });

    return sorted;
  }, [data, sortConfig]);

  const toggleSort = (key: keyof T) => {
    setSortConfig((prev) => {
      if (!prev || prev.key !== key) {
        return { key, direction: "asc" };
      }
      return {
        key,
        direction: prev.direction === "asc" ? "desc" : "asc",
      };
    });
  };

  const toggleRowSelection = (id: string | number) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      if (onSelect) {
        const selectedItems = sortedData.filter((item) =>
          newSet.has(item.id)
        );
        onSelect(selectedItems);
      }
      return newSet;
    });
  };

  const allSelected =
    sortedData.length > 0 &&
    sortedData.every((item) => selectedIds.has(item.id));

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
      if (onSelect) onSelect([]);
    } else {
      const newSet = new Set<string | number>();
      sortedData.forEach((item) => newSet.add(item.id));
      setSelectedIds(newSet);
      if (onSelect) {
        onSelect(sortedData);
      }
    }
  };

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
            />
          </th>
          {columns.map((col) => (
            <th
              key={col.header}
              className={col.sortable ? "sortable-header" : undefined}
              onClick={() =>
                col.sortable ? toggleSort(col.key) : undefined
              }
            >
              {col.header}
              {sortConfig?.key === col.key && (
                <span className="sort-indicator">
                  {sortConfig.direction === "asc" ? "▲" : "▼"}
                </span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item) => (
          <tr key={item.id}>
            <td>
              <input
                type="checkbox"
                checked={selectedIds.has(item.id)}
                onChange={() => toggleRowSelection(item.id)}
              />
            </td>
            {columns.map((col) => (
              <td key={String(col.key)}>
                {col.render
                  ? col.render(item)
                  : (item[col.key] as React.ReactNode)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
