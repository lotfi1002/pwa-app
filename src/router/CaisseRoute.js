import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const CaisseRoute =  ()=> {

  
    let isOpen = Boolean(Number(localStorage.getItem("isOpen"))); 
    if(!isOpen){
              
                return <Navigate to="/caisse" />;
    }else{
        
        return <Outlet />;
    }
  
      

  
  
  }

  export default CaisseRoute;