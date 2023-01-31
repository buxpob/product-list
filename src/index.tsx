import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { store } from './store/index';
import { Provider } from 'react-redux';
import { fetchDocumentsAction } from './store/api-actions';
import ErrorMessageComponent from './components/error-message/error-message';
import { APIRoute } from './consts/consts';
import 'antd/dist/reset.css';
import './css/index.css';

store.dispatch(fetchDocumentsAction({ URL: APIRoute.Documents1, numberDoc: '1' }));
store.dispatch(fetchDocumentsAction({ URL: APIRoute.Documents2, numberDoc: '2' }));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>

      <ErrorMessageComponent />

      <App />

    </Provider>
  </React.StrictMode>,
);
