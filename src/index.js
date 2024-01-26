import reportWebVitals from './reportWebVitals';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { persistor } from './components/store/storeIndex';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading = {null} persistor = {persistor}>
            <App />
          </PersistGate>
        </Provider >
    </BrowserRouter>
);

reportWebVitals();