// useFavorites.ts
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "../redux/books/reducers";
import { Book } from "../redux/books/types";
import { RootState } from "../redux/types";

export const useFavorites = () => {
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.books.books.results);
  const favorites = useSelector((state: RootState) => state.books.favorites);

  const handleAddToFavorites = (name: string) => {
    const book = books.find((book: Book) => book.name === name);
    if (book) {
      dispatch(addToFavorites(book));
    }
  };

  const isFavorite = (title: string) => {
    return favorites.some((fav) => fav.title === title);
  };

  return { favorites, isFavorite, handleAddToFavorites };
};

export default useFavorites;
