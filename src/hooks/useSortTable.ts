import { useState, useCallback } from "react";

interface SortBy {
  id: string;
  desc: boolean;
}

const useSortTable = (initialSortBy: SortBy) => {
  const [sortBy, setSortBy] = useState<SortBy>(initialSortBy);

  const handleSort = useCallback((columnId: string) => {
    setSortBy((prev) => ({
      id: columnId,
      desc: prev.id === columnId ? !prev.desc : false,
    }));
  }, []);

  return { sortBy, handleSort };
};

export default useSortTable;
