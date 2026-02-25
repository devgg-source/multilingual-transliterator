import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { TransliteratorProvider } from './context/TransliteratorContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TransliteratorProvider>
      <App />
    </TransliteratorProvider>
  </React.StrictMode>
);
