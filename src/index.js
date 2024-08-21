import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import reportWebVitals from './tests/reportWebVitals';

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Header } from "./components/Header.jsx"
import { Home } from "./components/Home.jsx"
import { Login } from "./components/Login.jsx"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        { /* TODO: Favorites */ }
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
