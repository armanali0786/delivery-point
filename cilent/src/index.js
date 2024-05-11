import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/cart/store';
import App from './App';
import { AuthProvider } from './app/context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
          <App />
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);
