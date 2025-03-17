export interface Book {
  id: number;
  url: string;
  name: string;
  authors: string[];
  title: string; 
  author: string;
  publishedDate: string;
  detail: string;
  subRows?: Book[];
}
export interface BookState {
  favorites: Book[]; // ⬅️ Cambia esto de `[]` a `Book[]`
  isFetching: boolean;
  books: {
    data: Book[];
    hasMore: boolean;
    totalResults: number;
    page: number;
    totalPages: number;
    isFetching: boolean;
    results: Book[];
    filterQuery: string;
  };
  selectedBook: Book | null;
}



export interface ApiResponse {
  books: Book[];
  hasMore: boolean;
  totalResults: number;
  page: number;
  totalPages: number;
}

