import { loadProductList, setError, setDataLoadedStatus, setTotalQuantity, setSelectedProductList } from './actions';
import { AdaptedProduct, CurrentProduct } from './../types/types';
import { createReducer } from '@reduxjs/toolkit';

type InitialState = {
  products: AdaptedProduct[];
  isDataLoaded: boolean;
  error: string | null;
  totalQuantity: number;
  selectedProductList: CurrentProduct[];
};

const initialState: InitialState = {
  products: [],
  isDataLoaded: true,
  error: null,
  totalQuantity: 0,
  selectedProductList: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadProductList, (state, action) => {
      state.products = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setTotalQuantity, (state, action) => {
      state.totalQuantity = action.payload;
    })
    .addCase(setSelectedProductList, (state, action) => {
      state.selectedProductList = action.payload;
    });
});
