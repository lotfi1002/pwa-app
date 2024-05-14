import React from 'react';
import './App.css';
import {LoginPage} from './pages/LoginPage';
import {DashboardPage} from './pages/DashboardPage';
import{ProductPage} from './pages/ProductPage'
import{ProductList} from './pages/ListProductsPage'
import { Navbar } from './ui_components/Navbar';
import { Routes,Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
        <Navbar/>
        <Routes>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/dashboard' element={<DashboardPage/>}></Route>
          <Route path='/product' element={<ProductPage/>}></Route>
          <Route path='/lproducts' element={<ProductList/>}></Route>
          
         </Routes>
    </div>
  );
}

export default App;
