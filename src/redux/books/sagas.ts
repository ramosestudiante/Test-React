import ApiBooks from "../../services/books";
import { fetchedBooks, getBooks, fetchedBookById, getBookById,setLoading,setError } from "./reducers";
import { takeEvery, call, put } from "redux-saga/effects";
import { ApiResponse, Book } from "./types";

const apiBooks = new ApiBooks();

function* FetchBookSaga(action: ReturnType<typeof getBooks>) {
  try {
    yield put(setLoading(true));

    const { query } = action.payload || {};
    const searchParams: { name?: string; author?: string } = {};

    if (query) {
      if (query.includes("author:")) {
        searchParams.author = query.replace("author:", "").trim();
      } else {
        searchParams.name = query;
      }
    }

    const resp: ApiResponse = yield call([apiBooks, apiBooks.getBooks], searchParams);

    let books: Book[] = Array.isArray(resp)
      ? resp.map((book) => ({
          id: Number(book.url.split("/").pop()) || 0,
          url: book.url,
          name: book.name || "",
          authors: Array.isArray(book.authors) ? book.authors : [],
          title: book.name || "",
          author: book.authors?.join(", ") || "",
          publishedDate: book.publishedDate || "",
          detail: book.detail || "",
        }))
      : [];

    if (query) {
      const lowerQuery = query.toLowerCase();
      books = books.filter((book) => {
        const matchesName = book.name.toLowerCase().includes(lowerQuery);
        const matchesAuthor = book.authors.some((author) =>
          author.toLowerCase().includes(lowerQuery)
        );
        return matchesName || matchesAuthor;
      });
    }

    yield put(fetchedBooks({ ...resp, books }));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching books:", error);
      yield put(setError(error.message));
    } else {
      console.error("Unknown error:", error);
      yield put(setError("An unknown error occurred."));
    }
  } finally {
    yield put(setLoading(false));
  }
}

function* FetchBookByIdSaga(action: ReturnType<typeof getBookById>) {
  try {
    yield put(setLoading(true));

    const { id } = action.payload;

    const resp: Book = yield call(() => apiBooks.getBookById(id));

    yield put(fetchedBookById(resp));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching book by ID:", error);
      // Manejar error
      yield put(setError(error.message));
    } else {
      console.error("Unknown error:", error);
      yield put(setError("An unknown error occurred."));
    }
  }
}

export function* watchBooks() {
  yield takeEvery(getBooks.type, FetchBookSaga);
  yield takeEvery(getBookById.type, FetchBookByIdSaga);
}
