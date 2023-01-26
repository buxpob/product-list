import { store } from './index';
import { setDataLoadedStatus, loadProductList, setError } from './actions';
import { BACKEND_URL, TIMEOUT_SHOW_ERROR, APIRoute } from '../consts/consts';
import { AxiosInstance } from 'axios';
import { CurrentProduct, Product, SelectedProducts } from '../types/types';
import { AppDispatch, State } from './../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import adaptProductsToClient from '../adapt';

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchDocumentsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'fetchContacts',
  async (_arg, { dispatch, extra: api }) => {
    const firstProductList = await api.get<Product[]>(`${BACKEND_URL}${APIRoute.Documents1}`);
    const secondProductList = await api.get<Product[]>(`${BACKEND_URL}${APIRoute.Documents2}`);
    const documentList = [
      ...adaptProductsToClient(firstProductList.data, '1'),
      ...adaptProductsToClient(secondProductList.data, '2'),
    ];

    dispatch(setDataLoadedStatus(true));
    dispatch(loadProductList(documentList));
    dispatch(setDataLoadedStatus(false));
  });

export const addIdProductListAction = createAsyncThunk<void, CurrentProduct[], {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'addProducts',
  async (_arg, { extra: api, getState }) => {
    const { selectedProductList } = getState();
    const selectedIdProductDocumentOne = selectedProductList.filter((product: CurrentProduct) => product.document === '1').map((product: CurrentProduct) => product.id);

    const selectedIdProductDocumentTwo = selectedProductList.filter((product: CurrentProduct) => product.document === '2').map((product: CurrentProduct) => product.id);

    await api.post<SelectedProducts[]>(`${BACKEND_URL}${APIRoute.Cancel}`, 
      [
        {
          document: '1',
          productsId: selectedIdProductDocumentOne,
        },
        {
          document: '2',
          productsId: selectedIdProductDocumentTwo,
        },
      ],
    );
  },
);
