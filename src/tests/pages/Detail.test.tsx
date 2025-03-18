import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import Detail from "../../pages/Detail";
import { removeFromFavorites } from "../../redux/books/reducers";

const bookMock = {
  id: 1,
  title: "Libro de Prueba",
  author: "Autor Prueba",
  publishedDate: "2023-01-01",
  url: "/book/1",
  name: "Libro de Prueba",
  authors: [],
  detail: "",
};

const store = configureStore({
  reducer: {
    books: (
      state = {
        selectedBook: bookMock,
        isFetching: false,
        favorites: [],
        filterQuery: "",
        error: "",
        Loading: false,
      }
    ) => state,
  },
});

describe("Detail", () => {
  it("should display book details", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Detail />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Libro de Prueba")).toBeInTheDocument();
  });

  it("should add to favorites when button is clicked", () => {
    render(
      <Provider store={store}>
        <Detail />
      </Provider>
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    button.click();
    expect(button).toHaveTextContent("Agregar a Favoritos");
  });

  it("should remove from favorites when button is clicked again", async () => {
    const stateWithFavorites = {
      books: {
        selectedBook: bookMock,
        isFetching: false,
        favorites: [bookMock],
      },
    };

    const storeWithFavorites = configureStore({
      reducer: {
        books: (state = stateWithFavorites.books) => state,
      },
    });

    const dispatchMock = jest.fn();
    storeWithFavorites.dispatch = dispatchMock;

    render(
      <Provider store={storeWithFavorites}>
        <MemoryRouter>
          <Detail />
        </MemoryRouter>
      </Provider>
    );

    // Verifica que el botón diga 'Eliminar de Favoritos' si el libro ya está en favoritos
    const favoriteButton = screen.getByRole("button", {
      name: "Eliminar de Favoritos",
    });
    expect(favoriteButton).toBeInTheDocument();

    // click en el botón de eliminar de favoritos
    fireEvent.click(favoriteButton);

    // Verifica que la acción de eliminar de favoritos haya sido llamada
    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(
        removeFromFavorites(bookMock.name ?? bookMock.url)
      );
    });
  });
});
