import React, { ReactNode } from "react";
import Table from "../components/Table";
import { useDispatch } from "react-redux";
import { fetchedBooks } from "../redux/books/reducers";
import Search from "../components/Search";
import { Book } from "../redux/books/types";
import Modal from "../components/Modal";
import { useBooks } from "../hooks/useBooks";
import { useModal } from "../hooks/useModal";
import useFavorites from "../hooks/useFavorites";

interface LayoutProps {
  children?: ReactNode;
}

export const Home: React.FC<LayoutProps> = () => {
  const dispatch = useDispatch();
  const { filteredBooks, loading, error, fetchBooks } = useBooks();
  const { open, setOpen, handleChange, handleSubmit } = useModal();
  const { handleAddToFavorites } = useFavorites()||{};

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
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <Table
              data={filteredBooks}
              loading={false}
              onAddToFavorites={handleAddToFavorites}
            />
          )}
        </div>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Home;
