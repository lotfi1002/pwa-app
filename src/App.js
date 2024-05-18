import './App.css';

import React, {  useEffect,  } from 'react';
import {LoginPage} from './pages/LoginPage';
import {DashboardPage} from './pages/DashboardPage';
import{ProductPage} from './pages/ProductPage';
import{ProductList} from './pages/ListProductsPage';
import{PosPage} from './pages/PosPage';
import {CaissePage} from './pages/CaissePage';
import { Routes,Route } from 'react-router-dom';
import PrivateRoute from './router/PrivateRoute';
import { isAppOnline } from './utilities/CheckOnline';
import AuthProvider from './hooks/AuthProvider';



function App() {



  // each 60 seconds check the mode if online or offline
  useEffect(() => {
    const interval = setInterval(() => {

      isAppOnline().then((online)=>{//  chek application online 

          console.log((online)?"online":"offline");

    });
    }, 5000);
  
    return () => clearInterval(interval);
  }, []);
  
//const isAuth = Boolean( Number(localStorage.getItem("isAuth")));
//console.log("isAuth : "+isAuth);
  return (
<div className="App">
<AuthProvider>
  
       <Routes>
            <Route path='/login' element={<LoginPage/>}></Route>
     
              <Route element={<PrivateRoute/>}>
                      <Route path='/' element={<DashboardPage/>}></Route>
                      <Route path='/dashboard' element={<DashboardPage/>}></Route>
                      <Route path='/product' element={<ProductPage/>}></Route>
                      <Route path='/lproducts' element={<ProductList/>}></Route>
                      <Route path='/caisse' element={<CaissePage/>}></Route>
                      <Route path='/pos' element={<PosPage/>}></Route>
</Route>
</Routes>

</AuthProvider>
    </div>
  );
}

export default App;