import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import DataTable from "../Table";
import { Book } from "../../redux/books/types";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../../redux/books/reducers"; // Update with your actual Redux slice

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

const books: Book[] = [
  { id: 1, author: "Author 1", title: "Book 1", detail: "Detail 1", url: "", name: "", authors: [], publishedDate: "" },
  { id: 2, author: "Author 2", title: "Book 2", detail: "Detail 2", url: "", name: "", authors: [], publishedDate: "" },
  { id: 3, author: "Author 3", title: "Book 3", detail: "Detail 3", url: "", name: "", authors: [], publishedDate: "" },
];

const favorites: Book[] = [{ id: 1, author: "Author 1", title: "Book 1", detail: "Detail 1", url: "", name: "", authors: [], publishedDate: "" }];

export default {
  title: "Components/DataTable",
  component: DataTable,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Router>
          <Story />
        </Router>
      </Provider>
    ),
  ],
} as Meta;

const Template: StoryFn = (args) => {
  const [favoritesState, setFavoritesState] = useState<Book[]>(favorites);

  const handleAddToFavorites = (title: string) => {
    const newFavorite = books.find((book) => book.title === title);
    if (newFavorite) {
      setFavoritesState([...favoritesState, newFavorite]);
    }
  };

  const handleRemoveFromFavorites = (title: string) => {
    setFavoritesState(favoritesState.filter((book) => book.title !== title));
  };

  return (
    <DataTable
      {...args}
      data={books}
      loading={false}
      isFavoritesView={args.isFavoritesView}
      onAddToFavorites={handleAddToFavorites}
      onRemoveFromFavorites={handleRemoveFromFavorites}
    />
  );
};

export const Default = Template.bind({});
Default.args = { isFavoritesView: false };

export const Loading = Template.bind({});
Loading.args = { isFavoritesView: false, loading: true };

export const NoData = Template.bind({});
NoData.args = { isFavoritesView: false, data: [], loading: false };

export const FavoritesView = Template.bind({});
FavoritesView.args = { isFavoritesView: true, data: books, favorites: [] };
