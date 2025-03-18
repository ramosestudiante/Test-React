import '@testing-library/jest-dom';
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { Favorites } from "../../pages/Favorites";
import booksReducer from "../../redux/books/reducers";
import { MemoryRouter } from "react-router-dom";

const favoriteBooks = [
  { id: 1,name: "Libro 1",title: "Libro Favorito 1", authors: ["Autor 1"],author:"Autor 1", detail: "Detalle 1", url: "/book/1",publishedDate:"2024-01-01" },
  { id: 2,name: "Libro 2",title: "Libro Favorito 2", authors: ["Autor 2"], author:"Autor 2", detail: "Detalle 2", url: "/book/2",publishedDate:"2024-01-01" },
];

const store = configureStore({
    reducer: {
        books: booksReducer,
      },
      preloadedState: {
        books: {
          books: {
            data: [],
            hasMore: false,
            totalResults: 0,
            page: 0,
            totalPages: 0,
            isFetching: false,
            results: [],
            filterQuery: "",
          },
          error:'',
          loading:false,
          isFetching: false,
          selectedBook: null,
          favorites: favoriteBooks,
        },
      },
});

describe('Favorites', () => {
  it('should render the list of favorite books', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      favoriteBooks.forEach(async (book) => {
        const bookTitle = await screen.findByText(book.name);
        expect(bookTitle).toBeInTheDocument();
      });
    });
  });


});
