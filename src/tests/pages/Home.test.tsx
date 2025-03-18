import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Home from "../../pages/Home";
import booksReducer from "../../redux/books/reducers";
import { MemoryRouter } from "react-router-dom";
import { userEvent } from "@storybook/test";

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
  preloadedState: {
    books: {
      books: {
        data: [],
        hasMore: false,
        totalResults: 2,
        page: 1,
        totalPages: 1,
        isFetching: false,
        results: [],
        filterQuery: "",
      },
      error: "",
      loading: false,
      favorites: [],
      isFetching: false,
      selectedBook: null,
    },
  },
});

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

jest.mock("../../hooks/useBooks", () => ({
  useBooks: jest.fn().mockReturnValue({
    filteredBooks: [
      {
        title: "Book 1",
        author: "Author 1",
        genre: "Fiction",
        publicationDate: "2021",
      },
      {
        title: "Book 2",
        author: "Author 2",
        genre: "Mystery",
        publicationDate: "2022",
      },
    ],
    loading: false,
    error: null,
    fetchBooks: jest.fn(),
  }),
}));

jest.mock("../../hooks/useFavorites", () => ({
  useFavorites: jest.fn().mockReturnValue({
    handleAddToFavorites: jest.fn((book) =>
      store.dispatch({ type: "books/addToFavorites", payload: book })
    ),
  }),
}));

const renderHomeWithStore = () =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  );

describe("Home Component", () => {
  it("should render books and allow adding to favorites", async () => {
    renderHomeWithStore();

    await waitFor(() => {
      expect(screen.getByText("Book 1")).toBeInTheDocument();
      expect(screen.getByText("Book 2")).toBeInTheDocument();
    });
    const addToFavoritesButton = screen.getAllByRole("button", {
      name: /Agregar a favoritos/i,
    })[0];
    fireEvent.click(addToFavoritesButton);
  });

  it("should filter books by query", async () => {
    renderHomeWithStore();
    const searchInput = screen.getByPlaceholderText("Buscar libro o autor");
    userEvent.type(searchInput, "book 1");

    await waitFor(() => {
      const filteredBooks = screen.getAllByText(/Book 1/i);
      expect(filteredBooks.length).toBeGreaterThan(0);
    });
  });

  it("should open modal on add book button click", () => {
    renderHomeWithStore();

    const addButton = screen.getByLabelText("Agregar libro");
    fireEvent.click(addButton);

    // Verificar si el modal se abre
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
