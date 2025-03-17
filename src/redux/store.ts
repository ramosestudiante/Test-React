import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from '@redux-saga/core';
import watcherSaga from "./rootSagas";
import bookReducer from './books/reducers';

const sagaMiddleware = createSagaMiddleware();


export const store = configureStore({
    reducer:{
        books: bookReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(sagaMiddleware);
    },
});

sagaMiddleware.run(watcherSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;


export default store;