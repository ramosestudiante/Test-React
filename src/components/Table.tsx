import React, { useMemo } from "react";
import { useTable, useSortBy, Column } from "react-table";
import { EyeIcon, HeartIcon, TrashIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import useSortTable from "../hooks/useSortTable";
import useFavorites from "../hooks/useFavorites";

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
  const { sortBy, handleSort } = useSortTable({ id: "title", desc: false });

  const { favorites } = useFavorites();

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
              className="text-indigo-600 hover:text-indigo-800"
              to={`/detail/${row.original.id}`}
            >
              <EyeIcon className="inline-block w-5 h-5 mr-1" />
            </Link>
            {isFavoritesView ? (
              <button
                onClick={() => onRemoveFromFavorites?.(row.original.title)}
                className="text-red-600 hover:text-red-800"
                aria-label="Eliminar de favoritos"
                data-testid="remove-button"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => onAddToFavorites?.(row.original.title)}
                className={`${
                  favorites.some((fav) => fav.title === row.original.title)
                    ? "text-red-600 hover:text-red-800"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                aria-label="Agregar a favoritos"
              >
                <HeartIcon className="w-5 h-5" />
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

  return (
    <div className="p-4 overflow-x-auto">
      <table
        {...getTableProps()}
        className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md"
      >
        <thead className="bg-gray-50">
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
                      className="py-3 px-6 text-left text-sm font-medium text-gray-700 cursor-pointer"
                      onClick={() => handleSort(column.id)}
                    >
                      <div className="flex items-center justify-between">
                        {column.render("Header")}
                        {sortBy.id === column.id && (
                          <span className="ml-2 text-xs">
                            {sortBy.desc ? "↓" : "↑"}
                          </span>
                        )}
                      </div>
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
                  className="hover:bg-gray-100 transition-colors duration-200"
                >
                  {row.cells.map((cell) => {
                    const { key, ...restCellProps } = cell.getCellProps();
                    return (
                      <td
                        key={key}
                        {...restCellProps}
                        className="py-3 px-6 text-sm text-gray-600 border-t border-gray-200"
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
