// import { all, fork } from 'redux-saga/effects';
import {fork } from 'redux-saga/effects';
import { watchBooks } from './books/sagas';

export default function* watcherSaga() {
  yield fork(watchBooks);
}
