import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import { ToastProvider } from 'react-toast-notifications';
import { AuthProvider } from './providers/AuthProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ToastProvider
    autoDismiss={true}
    autoDismissTimeout={5000}
    placement="top-right"
  >
    <AuthProvider>
      <App />
    </AuthProvider>
  </ToastProvider>
);
