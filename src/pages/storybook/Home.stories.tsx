import { Provider } from "react-redux";
import { StoryFn } from "@storybook/react";
import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../../redux/books/reducers";
import Home from "../Home";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Pages/Home",
  component: Home,
};

const store = configureStore({
    reducer: {
      books: booksReducer,
    },
    preloadedState: {
      books: {
        books: {
          data: [
            {
              id: 1,
              title: "Book 1",
              author: "Author 1",
              genre: "Fiction",
              publicationDate: "2021",
              url: "https://example.com/book1",
              name: "Book 1",
              authors: ["Author 1"],
              publishedDate: "2021-01-01",
              detail: "Detailed information about Book 1",
            },
            {
              id: 2,
              title: "Book 2",
              author: "Author 2",
              genre: "Mystery",
              publicationDate: "2022",
              url: "https://example.com/book2",
              name: "Book 2",
              authors: ["Author 2"],
              publishedDate: "2022-02-01",
              detail: "Detailed information about Book 2",
            },
          ],
          hasMore: false,
          totalResults: 2,
          page: 1,
          totalPages: 1,
          isFetching: false,
          results: [],
          filterQuery: "",
        },
        favorites: [],
        isFetching: false,
        selectedBook: null,
      },
    },
  });
  
  
  

const Template: StoryFn = () => (
  <Provider store={store}>
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  </Provider>
);

export const Default = Template.bind({});
