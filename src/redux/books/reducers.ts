import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookState, ApiResponse, Book } from "./types";

const initialState: BookState = {
  books: {
    data: [],
    hasMore: false,
    totalResults: 0,
    page: 0,
    totalPages: 0,
    isFetching: false,
    results: [],
    filterQuery: ""
  },
  isFetching: false,
  selectedBook: null,
  favorites: [],
  error: null,
  loading: false,
};

const bookSlice = createSlice({
  name: "bookSlice",
  initialState,
  reducers: {
    getBooks: (state, action: PayloadAction<{ query?: string } | undefined>) => {
      state.books.isFetching = true;
      state.loading = true;
      if (action.payload?.query) {
        state.books.filterQuery = action.payload.query;
      }
    },
    fetchedBooks: (state, action: PayloadAction<ApiResponse>) => {
      state.books = {
        ...state.books,
        data: action.payload.books || [],
        results: action.payload.books ? action.payload.books.slice(0, 10) : [],
        isFetching: false,
      };
      state.loading = false;
    },

    setFilterQuery: (state, action: PayloadAction<string>) => {
      const query = action.payload.toLowerCase().trim();
      state.books.filterQuery = query;
    
      const filteredBooks = state.books.data.filter((book) => {
        const matchesName = book.name?.toLowerCase().includes(query);
        const matchesAuthor = Array.isArray(book.authors)
          ? book.authors.some((author) => author.toLowerCase().includes(query))
          : false;
    
        return matchesName || matchesAuthor;
      });
    
      state.books.results = filteredBooks.map((book) => ({
        id: book.id,
        name: book.name, 
        authors: book.authors?.some((author) => author.toLowerCase().includes(query))
          ? book.authors
          : [],
        url: book.url || "", 
        title: book.title || book.name, 
        author: book.authors.join(", "), 
        publishedDate: book.publishedDate || "", 
        detail: book.detail || "",
      }));
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getBookById: (state, action: PayloadAction<{ id: number }>) => {
      state.selectedBook = null; 
      state.books.isFetching = true;
      state.loading = true;
    },
    fetchedBookById: (state, action: PayloadAction<Book>) => {
      state.selectedBook = action.payload;
      state.books.isFetching = false;
      state.loading = false;
    },
    addToFavorites: (state, action: PayloadAction<Book>) => {
      const bookExists = state.favorites.some(book => book.name === action.payload.name || book.url === action.payload.url);
      if (!bookExists) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(book => book.name !== action.payload);
    },

    fetchBooksError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchBookByIdError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    resetState: () => initialState,
  },
});

export const {
  getBooks,
  fetchedBooks,
  resetState,
  setFilterQuery,
  getBookById,
  fetchedBookById,
  addToFavorites,
  removeFromFavorites,
  fetchBooksError,
  fetchBookByIdError,
  setLoading,
  setError
} = bookSlice.actions;

export default bookSlice.reducer;
