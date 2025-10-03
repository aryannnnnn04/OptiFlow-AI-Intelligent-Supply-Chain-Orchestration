import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { GlobalStateProvider } from './contexts/GlobalStateContext.jsx';
import './style.css';

// Ensure the root element exists before rendering
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </React.StrictMode>,
  );
} else {
  console.error('Failed to find the root element');
}