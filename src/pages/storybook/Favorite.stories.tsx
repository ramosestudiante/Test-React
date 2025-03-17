import { Meta, StoryFn } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import Favorites from "../Favorites";
import bookReducer from "../../redux/books/reducers";

const mockStore = configureStore({
    reducer: {
      books: bookReducer,
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
        isFetching: false,
        selectedBook: null,
        favorites: [
          {
            id: 1,
            name: "Libro Favorito 1",
            title: "Libro Favorito 1",
            authors: ["Autor 1"],
            author: "Autor 1",
            detail: "Este es un detalle del libro favorito 1.",
            url: "https://example.com/1",
            publishedDate: "2024-01-01",
          },
          {
            id: 2,
            name: "Libro Favorito 2",
            title: "Libro Favorito 2",
            authors: ["Autor 2"],
            author: "Autor 2",
            detail: "Este es un detalle del libro favorito 2.",
            url: "https://example.com/2",
            publishedDate: "2024-01-02",
          },
        ],
      },
    },
  });
  
  
  

export default {
  title: "Components/Favorites",
  component: Favorites,
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],
} as Meta;

const Template: StoryFn = () => <Favorites />;

export const Default = Template.bind({});
Default.args = {};
