import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import appStore from './utils/appStore.jsx';
import Opening from './Opening.jsx';
import Login from './components/Login.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/to-do" element={<Opening />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
);
