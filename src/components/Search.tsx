import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setFilterQuery } from "../redux/books/reducers";
import { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import { Book } from "../redux/books/types";

interface SearchProps {
  onSelect: (book: Book) => void;
  fetchBooks: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSelect, fetchBooks }) => {
  const dispatch = useDispatch();
  const books = useSelector(
    (state: RootState) => state.books?.books?.results || []
  );
  const filterQuery = useSelector(
    (state: RootState) => state.books?.books?.filterQuery || ""
  );

  const [query, setQuery] = useState(filterQuery);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    setQuery(filterQuery);
  }, [filterQuery]);

  useEffect(() => {
    if (!query) {
      fetchBooks("");
    }
  }, [query]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value || "";
    setQuery(value);
    dispatch(setFilterQuery(value));
  };

  return (
    <div className="w-full max-w-md ml-4 mt-5">
      <Combobox
        value={selectedBook}
        onChange={(value: Book | null) => {
          if (!value) return;
          setSelectedBook(value);
          setQuery(value.name || "");
          onSelect(value);
        }}
      >
        <div className="relative">
          <div className="relative w-full text-gray-700">
            <Combobox.Input
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={query}
              onChange={handleSearch}
              placeholder="Buscar libro o autor"
            />
          </div>
          {books.length > 0 && (
            <Combobox.Options className="absolute mt-1 w-full bg-white shadow-md rounded-md max-h-60 overflow-auto">
              {books.map((book, index) => (
                <Combobox.Option
                  key={book?.id || index}
                  value={book}
                  className={({ active }) =>
                    `cursor-pointer p-2 ${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    }`
                  }
                >
                  {filterQuery &&
                  books.some((b) =>
                    b.name?.toLowerCase().includes(filterQuery.toLowerCase())
                  ) ? (
                    <span className="font-semibold">{book?.name}</span>
                  ) : (
                    <>
                      <span className="font-semibold">{book?.name}</span>
                      <span className="text-sm text-gray-500">
                        {" - "}
                        {book?.authors?.join(", ")}
                      </span>
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </div>
  );
};

export default Search;
