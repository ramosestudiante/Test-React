import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/types";
import { removeFromFavorites } from "../redux/books/reducers"; // Asegúrate de tener estas acciones en tu redux
import Table from "../components/Table";

export const Favorites = () => {
  const dispatch = useDispatch();
  const favoriteBooks = useSelector((store: RootState) => store.books.favorites);


  const handleRemoveFromFavorites = (name: string) => {
    const book = favoriteBooks.find(book => book.name === name);
    if (book) {
      dispatch(removeFromFavorites(book.name));
    }
  };

  const formattedFavorites = favoriteBooks.map((book) => {
    const idMatch = book?.url ? book.url.match(/\/(\d+)$/) : null;
    const id = idMatch ? parseInt(idMatch[1], 10) : 0;
  
    return {
      id,
      title: book?.title || book?.name,
      author: book?.authors ? book.authors.join(", ") : "Desconocido",
      detail: book?.detail,
    };
  });

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center mt-8">Libros Favoritos</h2>
      <Table
        data={formattedFavorites}
        loading={false}
        isFavoritesView={true}
        favorites={favoriteBooks}
        onRemoveFromFavorites={handleRemoveFromFavorites}
      />
    </div>
  );
};

export default Favorites;
