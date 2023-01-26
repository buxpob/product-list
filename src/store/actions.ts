import { AdaptedProduct, CurrentProduct } from './../types/types';
import { createAction } from '@reduxjs/toolkit';

export const loadProductList = createAction<AdaptedProduct[]>('loadProductList');

export const setDataLoadedStatus = createAction<boolean>('setDataLoadedStatus');

export const setError = createAction<string | null>('setError');

export const setTotalQuantity = createAction<number>('setTotalQuantity');

export const setSelectedProductList = createAction<CurrentProduct[]>('setSelectedProductList');
