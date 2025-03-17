import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookById } from "../redux/books/reducers";
import { RootState } from "../redux/store";
import { faker } from "@faker-js/faker";
import { addToFavorites, removeFromFavorites } from "../redux/books/reducers";

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const book = useSelector((state: RootState) => state.books.selectedBook);
  const isFetching = useSelector((state: RootState) => state.books.isFetching);
  const favorites = useSelector((state: RootState) => state.books.favorites);

  const [isFavorite, setIsFavorite] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [rating, setRating] = useState(0);

  const toggleFavorite = () => {
    if (!book) return;

    const bookId = Number(book?.url.split("/").pop()) || 0;

    const transformedBook = {
      author: book?.authors?.[0] || "",
      authors: book?.authors || [],
      detail: book?.detail || "",
      id: bookId,
      name: book?.name || "",
      publishedDate: book?.publishedDate || "",
      title: book?.name || "",
      url: book?.url || "",
    };

    if (isFavorite) {
      dispatch(removeFromFavorites(book.name ?? book.url));
    } else {
      dispatch(addToFavorites(transformedBook));
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getBookById({ id: Number(id) }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (book) {
      const isFav = favorites.some(
        (favBook) => favBook.name === book.name || favBook.url === book.url
      );
      setIsFavorite(isFav);
    }
  }, [book, favorites]);

  useEffect(() => {
    setImageUrl("https://picsum.photos/400/600?random=1");
    setDescription(faker.lorem.sentence());
    setSynopsis(faker.lorem.paragraph());
    setRating(faker.number.int({ min: 1, max: 5 }));
  }, []);

  if (isFetching) {
    return <div>Cargando...</div>;
  }

  if (!book) {
    return <div>No se encontró el libro.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <div className="flex flex-col lg:flex-row">
        {/* Imagen del libro */}
        <div className="lg:w-1/3 mb-6 lg:mb-0">
          <img
            src={imageUrl}
            alt={book.name}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Información del libro */}
        <div className="lg:w-2/3 lg:pl-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            {book.name}
          </h1>
          <p className="text-lg text-gray-600 mb-4">{description}</p>

          {/* Sinopsis */}
          <div className="mb-4">
            <h2 className="text-xl font-medium text-gray-800">Sinopsis</h2>
            <p className="text-gray-600">{synopsis}</p>
          </div>

          {/* Calificación */}
          <div className="mb-4">
            <h2 className="text-xl font-medium text-gray-800">Calificación</h2>
            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-6 h-6 ${
                    index < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  x="0"
                  y="0"
                >
                  <path d="M10 15l5.39 3.16-1.02-5.92L18 7.42l-5.97-.48L10 1 7.97 6.94 2 7.42l3.63 4.82-1.02 5.92L10 15z"></path>
                </svg>
              ))}
            </div>
          </div>

          {/* Botón de favoritos */}
          <button
            onClick={toggleFavorite}
            className={`px-6 py-2 mt-4 rounded-lg text-white ${
              isFavorite ? "bg-red-500" : "bg-gray-600"
            } hover:bg-red-600 transition`}
          >
            {isFavorite ? "Eliminar de Favoritos" : "Agregar a Favoritos"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
