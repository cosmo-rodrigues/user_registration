//@ts-nocheck
import { useMemo, useState } from "react";

export const useSortableData = (items, direction) => {
  const [sortConfig, setSortConfig] = useState({
    key: "updatedAt",
    direction: "ascending",
  });

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    sortableItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "descending" ? 1 : -1;
      }
      return 0;
    });
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key, direction) => {
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort };
};
