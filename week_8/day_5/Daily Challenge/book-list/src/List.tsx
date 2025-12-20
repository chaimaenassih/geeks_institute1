import React from "react";

type ListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string | number;
  emptyMessage?: string;
};

export function List<T>({
  items,
  renderItem,
  keyExtractor,
  emptyMessage,
}: ListProps<T>) {
  if (items.length === 0) {
    return <p>{emptyMessage ?? "Aucun élément à afficher."}</p>;
  }

  return (
    <ul style={{ display: "grid", gap: 10, padding: 0, listStyle: "none" }}>
      {items.map((item, index) => (
        <li
          key={keyExtractor(item, index)}
          style={{
            border: "1px solid #ddd",
            padding: 12,
            borderRadius: 10,
          }}
        >
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}
