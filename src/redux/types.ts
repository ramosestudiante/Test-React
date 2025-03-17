// types.ts

// Importa los tipos de tus reducers
import { BookState } from './books/types';

// Define el tipo RootState
export interface RootState {
  books: BookState;
}
