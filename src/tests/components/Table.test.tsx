import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import DataTable from "../../components/Table";
import { createStore } from "redux";

const mockState = {
  books: {
    books: {
      results: [
        {
          id: 1,
          author: "Gabriel García Márquez",
          title: "Papelucho",
          detail: "Un clásico",
        },
        { id: 2, author: "Julio Cortázar", title: "Rayuela", detail: "Novela" },
      ],
    },
    favorites: [],
  },
};

const mockReducer = (state = mockState) => state;

const store = createStore(mockReducer);

describe("DataTable Component", () => {
  it("renders the table correctly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DataTable data={mockState.books.books.results} loading={false} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Papelucho")).toBeInTheDocument();
    expect(screen.getByText("Rayuela")).toBeInTheDocument();
  });

  it("shows a loading state", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DataTable data={mockState.books.books.results} loading={true} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("shows a message when there are no books", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DataTable data={[]} loading={false} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("No hay libros disponibles.")).toBeInTheDocument();
  });

  it("sorts books when clicking the title header", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DataTable data={mockState.books.books.results} loading={false} />
        </BrowserRouter>
      </Provider>
    );

    const titleHeader = screen.getByText("Título");
    fireEvent.click(titleHeader);

    expect(screen.getAllByRole("row")[1]).toHaveTextContent("Rayuela");
  });

  it("adds a book to favorites", () => {
    const mockAddToFavorites = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <DataTable
            data={mockState.books.books.results}
            loading={false}
            onAddToFavorites={mockAddToFavorites}
          />
        </BrowserRouter>
      </Provider>
    );

    const favoriteButton = screen.getAllByLabelText("Agregar a favoritos")[0];

    fireEvent.click(favoriteButton);

    expect(mockAddToFavorites).toHaveBeenCalledWith("Papelucho");
  });

  it("removes a book from favorites", async () => {
    const mockRemoveFromFavorites = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <DataTable
            data={mockState.books.books.results}
            loading={false}
            onRemoveFromFavorites={mockRemoveFromFavorites}
            isFavoritesView={true}
          />
        </BrowserRouter>
      </Provider>
    );

    const removeButtons = await screen.findAllByTestId("remove-button");
    fireEvent.click(removeButtons[0]);

    expect(mockRemoveFromFavorites).toHaveBeenCalledWith("Papelucho");
  });
});
