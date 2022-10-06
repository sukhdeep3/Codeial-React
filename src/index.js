import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import { ToastProvider } from 'react-toast-notifications';
import { AuthProvider, PostsProvider } from './providers';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ToastProvider
    autoDismiss={true}
    autoDismissTimeout={5000}
    placement="top-right"
  >
    <AuthProvider>
      <PostsProvider>
        <App />
      </PostsProvider>
    </AuthProvider>
  </ToastProvider>
);
