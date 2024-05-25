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
import AuthProvider, { useAuth } from './hooks/AuthProvider';
import { isAppOnline } from './utilities/CheckOnline';
import OtherServices from './services/OtherServices';

function App() {

  const navigate = useNavigate();
  const auth = useAuth();

  // each 1 second check the mode if online or offline
  useEffect(() => {
    const interval = setInterval(() => {

      isAppOnline().then((online)=>{//  chek application online 
        
        console.log((online)?"online":"offline");
        localStorage.setItem('isOnline', (online)?1:0);

        if(online && localStorage.getItem('token') === null ){
              navigate('/login');
        }
      
    });
    }, 1000);
  
    return () => clearInterval(interval);
  });

// every 5 min verify the token expiration from the server
  useEffect(  

    () => {

        const intervalchek = setInterval(
    
            ()=>{
        // chek token expiration 

        OtherServices.chekToken("api/checktoken").then(

          (rep) => {
            //console.log(rep)
            const {status, error } = rep.data;

            if(status === false && error === "Failed to access"){

              auth.logOut();
            }
      
    });
    return () => clearInterval(intervalchek);
            } ,  500000

        );
    }

  );
  
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