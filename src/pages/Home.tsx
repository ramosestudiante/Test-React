import React, { ReactNode, useEffect, useMemo, useState } from "react";
import Table from "../components/Table";
import { RootState } from "../redux/types";
import { useDispatch, useSelector } from "react-redux";
import { fetchedBooks, getBooks, addToFavorites } from "../redux/books/reducers";
import Search from "../components/Search";
import { Book } from "../redux/books/types";
import Modal from "../components/Modal";

interface LayoutProps {
  children?: ReactNode;
}

export const Home: React.FC<LayoutProps> = () => {
  const dispatch = useDispatch();
  const { books, favorites } = useSelector((store: RootState) => store.books);
  const { filterQuery } = books;

  const [open, setOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
  });

  // Definir `booksAll` antes de usarlo
  const booksAll = useMemo(() => (Array.isArray(books.data) ? books.data : []), [books.data]);

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

  const handleAddToFavorites = (name: string) => {
    const book = booksAll.find((book) => book.name === name);
    if (book) {
      dispatch(addToFavorites(book));
    }
  };

  useEffect(() => {
    // Obtén los libros de los favoritos al iniciar la página
    dispatch(getBooks({}));
  }, [dispatch, favorites])

  const handleSelect = (book: Book) => {
    dispatch(
      fetchedBooks({
        books: [book],
        hasMore: false,
        totalResults: 1,
        page: 1,
        totalPages: 1,
      })
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Nuevo libro agregado: ", newBook);
    // Aquí podrías llamar a una acción Redux para añadir el libro.
    setOpen(false);
  };

  return (
    <div className="flex justify-center items-start w-full">
      <div className="flex flex-col w-full">
        <div className="w-full flex items-center justify-between px-4">
          <Search onSelect={handleSelect} fetchBooks={fetchBooks} />
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
            aria-label="Agregar libro"
          >
            +
          </button>
        </div>
        <div className="w-full p-4">
          <Table data={filteredBooks} loading={false} onAddToFavorites={handleAddToFavorites} />
        </div>
      </div>
      <Modal open={open} setOpen={setOpen} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
};

export default Home;
