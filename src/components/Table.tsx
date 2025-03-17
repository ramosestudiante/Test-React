import React, { useMemo, useState } from "react";
import { useTable, useSortBy, Column } from "react-table";
import { EyeIcon, HeartIcon, TrashIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/types";

interface Book {
  id: number;
  author: string;
  title: string;
  detail: string;
}

interface DataTableProps {
  data: Book[];
  loading: boolean;
  isFavoritesView?: boolean;
  onAddToFavorites?: (name: string) => void;
  onRemoveFromFavorites?: (name: string) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  loading,
  isFavoritesView = false,
  onAddToFavorites,
  onRemoveFromFavorites,
}) => {
  const [sortBy, setSortBy] = useState<{ id: string; desc: boolean }>({
    id: "title",
    desc: false,
  });
  const favorites = useSelector((state: RootState) => state.books.favorites);
  console.log('favoritess', favorites);
  

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const aValue = a[sortBy.id as keyof Book];
      const bValue = b[sortBy.id as keyof Book];

      return sortBy.desc
        ? String(bValue).localeCompare(String(aValue))
        : String(aValue).localeCompare(String(bValue));
    });
  }, [data, sortBy]);

  const columns: Column<Book>[] = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      {
        Header: "Autor",
        accessor: "author",
        Cell: ({ value }) => <span>{value}</span>,
      },
      {
        Header: "Título",
        accessor: "title",
        Cell: ({ value }) => <span>{value}</span>,
      },
      {
        Header: "Detalle",
        accessor: "detail",
        Cell: ({ row }) => (
          <div className="flex items-center space-x-2">
            <Link
              title="Ver detalles del libro"
              className="text-blue-500 hover:text-blue-700"
              to={`/detail/${row.original.id}`}
            >
              <EyeIcon className="inline-block w-5 h-5 mr-1" />
            </Link>
            {isFavoritesView ? (
              <button
                onClick={() => onRemoveFromFavorites?.(row.original.title)}
                 data-testid="remove-button"
              >
                <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-700" />
              </button>
            ) : (
              <button
                onClick={() => onAddToFavorites?.(row.original.title)}
                aria-label="Agregar a favoritos"
              >
                <HeartIcon
                data-testid="remove-button"
                  className={`w-5 h-5 ${
                    favorites.some((fav) => fav.title === row.original.title)
                      ? "text-red-500"
                      : "text-gray-500"
                  } hover:text-red-500`}
                />
              </button>
            )}
          </div>
        ),
      },
    ],
    [isFavoritesView, onAddToFavorites, onRemoveFromFavorites, favorites]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: sortedData,
      },
      useSortBy
    );

  const handleSort = (columnId: string) => {
    setSortBy((prev) => ({
      id: columnId,
      desc: prev.id === columnId ? !prev.desc : false,
    }));
  };

  return (
    <div className="p-4">
      <table
        {...getTableProps()}
        className="min-w-full border border-gray-300 shadow-md mt-5"
      >
        <thead className="bg-gray-100">
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...restHeaderGroupProps} className="border-b">
                {headerGroup.headers.map((column) => {
                  const { key, ...restHeaderProps } = column.getHeaderProps();
                  return (
                    <th
                      key={key}
                      {...restHeaderProps}
                      className="py-2 px-4 text-left border-r last:border-r-0 cursor-pointer"
                      onClick={() => handleSort(column.id)}
                    >
                      {column.render("Header")}
                      {sortBy.id === column.id && (
                        <span className="ml-2">{sortBy.desc ? "↓" : "↑"}</span>
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-gray-500"
              >
                Cargando...
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-gray-500"
              >
                No hay libros disponibles.
              </td>
            </tr>
          ) : (
            rows.map((row) => {
              prepareRow(row);
              const { key, ...restRowProps } = row.getRowProps();
              return (
                <tr
                  key={key}
                  {...restRowProps}
                  className="border-b hover:bg-gray-50"
                >
                  {row.cells.map((cell) => {
                    const { key, ...restCellProps } = cell.getCellProps();
                    return (
                      <td
                        key={key}
                        {...restCellProps}
                        className="py-2 px-4 border-r last:border-r-0"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
