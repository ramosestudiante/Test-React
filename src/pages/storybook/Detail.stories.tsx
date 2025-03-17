import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { Meta, StoryFn } from '@storybook/react';
import Detail from '../Detail';
import bookReducer from '../../redux/books/reducers';

// Configuración del store
const mockStore = configureStore({
  reducer: {
    books: bookReducer,
  },
  preloadedState: {
    books: {
      selectedBook: {
        id: 1,
        title: 'Libro de Ejemplo',
        name: 'Libro de Ejemplo',
        author: 'Autor Ejemplo',
        detail: 'Detalle del libro',
        url: 'https://example.com',
        authors: ['Autor 1'],
        publishedDate: '2023-01-01',
      },
      isFetching: false,
      favorites: [],
      books: {
        data: [],
        hasMore: false,
        totalResults: 0,
        page: 0,
        totalPages: 0,
        isFetching: false,
        results: [],
        filterQuery: '',
      },
    },
  },
});

export default {
  title: 'Components/Detail',
  component: Detail,
  decorators: [
    (Story) => <Provider store={mockStore}><Story /></Provider>,
  ],
} as Meta;

const Template: StoryFn = () => <Detail />;

export const Default = Template.bind({});
Default.args = {};


export const LoadingState = Template.bind({});
LoadingState.args = {};
LoadingState.decorators = [
  (Story) => {
    const loadingStore = configureStore({
      reducer: {
        books: bookReducer,
      },
      preloadedState: {
        books: {
          selectedBook: null, // No hay libro seleccionado
          isFetching: true,   // Estado de carga
          favorites: [],
          books: {
            data: [],
            hasMore: false,
            totalResults: 0,
            page: 0,
            totalPages: 0,
            isFetching: true,
            results: [],
            filterQuery: '',
          },
        },
      },
    });
    return <Provider store={loadingStore}><Story /></Provider>;
  },
];

export const NoBookFound = Template.bind({});
NoBookFound.args = {};
NoBookFound.decorators = [
  (Story) => {
    const noBookStore = configureStore({
      reducer: {
        books: bookReducer,
      },
      preloadedState: {
        books: {
          selectedBook: null,  // No hay libro seleccionado
          isFetching: false,   // Estado no de carga
          favorites: [],
          books: {
            data: [],
            hasMore: false,
            totalResults: 0,
            page: 0,
            totalPages: 0,
            isFetching: false,
            results: [],
            filterQuery: '',
          },
        },
      },
    });
    return <Provider store={noBookStore}><Story /></Provider>;
  },
];
