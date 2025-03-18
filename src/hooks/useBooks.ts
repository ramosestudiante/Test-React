import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/types";
import { getBooks } from "../redux/books/reducers";
import { useEffect, useMemo } from "react";

export const useBooks = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((store: RootState) => store.books);
  
  // Ensure books is defined before destructuring filterQuery
  const filterQuery = books ? books.filterQuery : '';

  const booksAll = useMemo(() => (Array.isArray(books?.data) ? books.data : []), [books?.data]);
  const favoriteBooks = useSelector((store: RootState) => store.books.favorites);
  const booksSelected = useSelector((store: RootState) => store.books.selectedBook);

  useEffect(() => {
    dispatch(getBooks({}));
  }, [dispatch]);

  const fetchBooks = (query?: string) => {
    dispatch(getBooks(query ? { query } : {}));
  };

  const filteredBooks = useMemo(() => {
    if (!filterQuery) return booksAll;
    const query = filterQuery.toLowerCase();
    return booksAll.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.authors?.some((author) => author.toLowerCase().includes(query))
    );
  }, [booksAll, filterQuery]);

  return { booksAll, filteredBooks, loading, error, fetchBooks, favoriteBooks, booksSelected };
};
