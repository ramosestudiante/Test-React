import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Search from "../../components/Search";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { setFilterQuery } from '../../redux/books/reducers';

const mockOnSelect = jest.fn();
const mockFetchBooks = jest.fn();

const store = configureStore({
  reducer: {
    books: () => ({
      books: {
        results: [
          { id: 1, name: "Cien años de soledad", authors: ["Gabriel García Márquez"] },
          { id: 2, name: "Rayuela", authors: ["Julio Cortázar"] },
        ],
        filterQuery: "",
      },
    }),
  },
});
global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

describe("Search Component", () => {
  beforeEach(() => {
    store.dispatch = jest.fn();
  });

  it("renders the search input correctly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Search onSelect={mockOnSelect} fetchBooks={mockFetchBooks} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText("Buscar libro o autor")).toBeInTheDocument();
  });

  it("updates input value and dispatches setFilterQuery", () => {
    const dispatchMock = jest.fn();
    store.dispatch = dispatchMock;

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Search onSelect={mockOnSelect} fetchBooks={mockFetchBooks} />
        </BrowserRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText("Buscar libro o autor");
    
    fireEvent.change(input, { target: { value: "Rayuela" } });

    expect(input).toHaveValue("Rayuela");
    expect(dispatchMock).toHaveBeenCalledWith(setFilterQuery('Rayuela'));
});

  it("calls fetchBooks when query is cleared", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Search onSelect={mockOnSelect} fetchBooks={mockFetchBooks} />
        </BrowserRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText("Buscar libro o autor");

    fireEvent.change(input, { target: { value: "Cien años de soledad" } });
    fireEvent.change(input, { target: { value: "" } });

    expect(mockFetchBooks).toHaveBeenCalledWith("");
  });


});
