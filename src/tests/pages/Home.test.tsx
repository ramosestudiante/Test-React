import '@testing-library/jest-dom';
import { render, screen,fireEvent,waitFor} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Home from '../../pages/Home';
import booksReducer from '../../redux/books/reducers';
import { MemoryRouter } from 'react-router-dom';


import { userEvent } from '@storybook/test';

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

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

const renderHomeWithStore = () =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  );

describe('Home Component', () => {

  test('should render books and allow adding to favorites', async () => {
    renderHomeWithStore();

    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.getByText('Book 2')).toBeInTheDocument();

    // Verificar si el botón agregar a favoritos funciona
    const addToFavoritesButton = screen.getAllByRole('button', { name: /Agregar a favoritos/i })[0];
    fireEvent.click(addToFavoritesButton);

    // Aquí se espera que el estado de favoritos se actualice
    await waitFor(() => {
      expect(store.getState().books.favorites.length).toBe(1);
      expect(store.getState().books.favorites[0].title).toBe('Book 1');
    });
  });


  test('should filter books by query', async () => {
renderHomeWithStore();    
    const searchInput = screen.getByPlaceholderText('Buscar libro o autor');
    userEvent.type(searchInput, 'book 1');
  
    //espera el resultado del filtro
    await waitFor(() => {
      // muestra el resultado del filtro
      const filteredBooks = screen.getAllByText(/Book 1/i);
      expect(filteredBooks.length).toBeGreaterThan(0);
    });
  });
  

   test('should open modal on add book button click', () => {
    renderHomeWithStore();

    const addButton = screen.getByLabelText('Agregar libro');
    fireEvent.click(addButton);

    // Verificar si el modal se abre
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  // test('should handle form inputs inside the modal', async () => {
  //   renderHomeWithStore();
  
  //   // Simula el click en el botón para abrir el modal
  //   const addButton = screen.getByText(/\+/i);
  //   fireEvent.click(addButton);
  
  //   // Espera a que el modal esté visible
  //   await waitFor(() => {
  //     expect(screen.getByText(/Agregar Libro/i)).toBeInTheDocument(); // Verifica que el formulario está presente
  //   });
  
  //   // Ahora interactúa con los campos del formulario
  //   const authorInput = await screen.findByPlaceholderText(/Autor/i);
  //   const titleInput = await screen.findByPlaceholderText(/Título/i);
  //   const genreInput = await screen.findByPlaceholderText(/Género/i);
  //   const publicationDateInput = await screen.findByPlaceholderText(/Fecha de publicación/i);
    
  
  //   // Simula el cambio de los valores de los inputs
  //   fireEvent.change(authorInput, { target: { value: 'New Author' } });
  //   fireEvent.change(titleInput, { target: { value: 'New Book' } });
  //   fireEvent.change(genreInput, { target: { value: 'New Genre' } });
  //   fireEvent.change(publicationDateInput, { target: { value: '2023-03-17' } });
  
  //   // Verifica que los valores de los campos hayan cambiado
  //   expect(authorInput).toHaveValue('New Author');
  //   expect(titleInput).toHaveValue('New Book');
  //   expect(genreInput).toHaveValue('New Genre');
  //   expect(publicationDateInput).toHaveValue('2023-03-17');
  // });
  
  

});
