import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import twelveDataReducer from './twelveData/reducer';

const client = axios.create({
  baseURL: 'https://api.twelvedata.com',
  responseType: 'json',
});

export const rootReducer = combineReducers({
  twelveData: twelveDataReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, axiosMiddleware(client)),
);

export default store;
