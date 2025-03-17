import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import DataTable from "../../components/Table"; // Adjust the import based on your project structure
import { BrowserRouter } from "react-router-dom";

const mockBooks = [
  { id: 1, author: "Gabriel García Márquez", title: "papelucho", detail: "Un clásico" },
  { id: 2, author: "Julio Cortázar", title: "Rayuela", detail: "Novela" },
];

describe("DataTable Component", () => {
  it("renders the table correctly", () => {
    render(
      <BrowserRouter>
        <DataTable data={mockBooks} loading={false} favorites={[]} />
      </BrowserRouter>
    );

    expect(screen.getByText("papelucho")).toBeInTheDocument();
    expect(screen.getByText("Rayuela")).toBeInTheDocument();
  });

  it("shows a loading state", () => {
    render(
      <BrowserRouter>
        <DataTable data={[]} loading={true} favorites={[]} />
      </BrowserRouter>
    );

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("shows a message when there are no books", () => {
    render(
      <BrowserRouter>
        <DataTable data={[]} loading={false} favorites={[]} />
      </BrowserRouter>
    );

    expect(screen.getByText("No hay libros disponibles.")).toBeInTheDocument();
  });

  it("sorts books when clicking the title header", () => {
    render(
      <BrowserRouter>
        <DataTable data={mockBooks} loading={false} favorites={[]} />
      </BrowserRouter>
    );

    const titleHeader = screen.getByText("Título");
    fireEvent.click(titleHeader);

    expect(screen.getAllByRole("row")[1]).toHaveTextContent("Rayuela");
  });

  it("adds a book to favorites", () => {
    const mockAddToFavorites = jest.fn();

    render(
      <BrowserRouter>
        <DataTable
          data={mockBooks}
          loading={false}
          favorites={[]}
          onAddToFavorites={mockAddToFavorites}
        />
      </BrowserRouter>
    );

    const favoriteButton = screen.getAllByLabelText("Agregar a favoritos")[0];
    fireEvent.click(favoriteButton);

    expect(mockAddToFavorites).toHaveBeenCalledWith("papelucho");
  });

  it("removes a book from favorites", async() => {
    const mockRemoveFromFavorites = jest.fn();

    render(
      <BrowserRouter>
        <DataTable
          data={mockBooks}
          loading={false}
          favorites={mockBooks}
          isFavoritesView={true}
          onRemoveFromFavorites={mockRemoveFromFavorites}
        />
      </BrowserRouter>
    );

    const removeButtons = await screen.findAllByTestId("remove-button");
    fireEvent.click(removeButtons[0]); // Click en el primer botón
    

    expect(mockRemoveFromFavorites).toHaveBeenCalledWith("papelucho");
  });
});
