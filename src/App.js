import './App.css';

import React, {  useEffect,  } from 'react';
import {LoginPage} from './pages/LoginPage';
import{ProductPage} from './pages/ProductPage';
import{ProductList} from './pages/ListProductsPage';
import{PosPage} from './pages/PosPage';
import {CaissePage} from './pages/CaissePage';
import { Routes,Route, useNavigate } from 'react-router-dom';
import PrivateRoute from './router/PrivateRoute';
import CaisseRoute from './router/CaisseRoute';
import AuthProvider from './hooks/AuthProvider';
import { isAppOnline } from './utilities/CheckOnline';

function App() {

  const navigate = useNavigate();

  // each 5 seconds check the mode if online or offline
  useEffect(() => {
    const interval = setInterval(() => {

      isAppOnline().then((online)=>{//  chek application online 
        
        console.log((online)?"online":"offline");
        localStorage.setItem('isOnline', (online)?1:0);

        if(online && localStorage.getItem('token') === null ){
              navigate('/login');
        }
       // verify if is closed form backend part 
       // CaisseRegisterServices.chekCaisse("api/caisse/check" , {'user_id':user.id} )

    });
    }, 5000);
  
    return () => clearInterval(interval);
  });
  
  return (
<div className="App">

<AuthProvider>
  
       <Routes>
            <Route path='/login' element={<LoginPage/>}></Route>
     
              <Route element={<PrivateRoute/>}>
              <Route element={<CaisseRoute/>}>
                      <Route path='/' element={<PosPage/>}></Route>
                      <Route path='/pos' element={<PosPage/>}></Route>
              </Route>       
                      <Route path='/product' element={<ProductPage/>}></Route>
                      <Route path='/lproducts' element={<ProductList/>}></Route>
                      <Route path='/caisse' element={<CaissePage/>}></Route>
                     
</Route>
</Routes>

</AuthProvider>

    </div>
  );
}

export default App;