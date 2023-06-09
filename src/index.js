import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
// React-router-dom
import { BrowserRouter } from 'react-router-dom';
// React-redux
import { Provider } from 'react-redux';
// Components
import App from './components/App';
// Redux
import { store } from './redux/store'
//
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
