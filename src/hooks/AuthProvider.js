import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utilities/Api";
import { BASE_URL } from "../utilities/Params";
import UserServices from "../services/UserServices";
import User from "../models/User";
import UserDao from "../dao/UserDao";
import CryptoJS from 'crypto-js';
import CaisseRegisterDao from "../dao/CaisseRegisterDao";
import CaisseRegisterServices from "../services/CaisseRegisterServices";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();
   

  const loginAction = async (action="api/auth" ,data , path) => {
      // get jwt from backend through credentials
       // Convert the JSON object into a query string
      api.put(BASE_URL+action , data ).then( (response)=>{
        const { token, status  , user } = response.data;
        if(status === true){
          // good response from web method
            setToken(token);
            localStorage.setItem('token', token);
            localStorage.setItem('user_id', user.id);
            localStorage.setItem('isAuth', 1);

            // get all users from backend 
            UserServices.getUsers("api/users/all").then( (response) => {
              if(response.data.status){
               if(response.data.response != null ) {
                          response.data.response.forEach((el)=>{
                               // save user in indexd db database 
                               if( data.username.localeCompare(el.username)!==0){
                                
                                UserDao.putUser(new User(el.id , el.username , el.password , el.email , ''));
                              
                              }else{
                                // crypted password 
                                const hash = CryptoJS.SHA1(data.password,CryptoJS.enc.Utf8).toString(CryptoJS.enc.Hex);
                               UserDao.putUser(new User(el.id , el.username , el.password , el.email , hash));
                              } 
                          } )   ;  }}}); 

            // caisse verification
            // get  Registre from indexddb bu connected user 
            CaisseRegisterDao.getOpenRegisterByUserId(user.id).then(

                  (response)=>{

                    if (response) {
                      localStorage.setItem("isOpen" , 1 );
                      navigate('/pos');
                    }else {

                      // check the backend 
                      CaisseRegisterServices.chekCaisse("api/caisse/check" ,  {'user_id':user.id}).then(

                          (rep)=>{

                            if(rep != null && rep.data != null){
                                
                              if(rep.data.response === false){ 
                                localStorage.setItem("isOpen" , 0);
                                navigate('/caisse');
                              }else{// open caisse from backend in indexdb
                                let data =  {
                                  "id": rep.data.response.id,
                                  "user_id" : rep.data.response.user_id,
                                  "cash_in_hand":rep.data.response.cash_in_hand,
                                  "date" : rep.data.response.date,
                                  "status":rep.data.response.status,
                                  "commit": 1 
                                };
                                // add infromation from the backend to pos_register (indexddb)
                                CaisseRegisterDao.openRegister(data);
                                localStorage.setItem("isOpen" ,  1);
                                navigate('/pos');
                              }

                            }

                          }


                      );

                      
                      
                    }


                  }


            );


        }else{ // bad response from web method
            
          setUser(null);
            setToken("");
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            //localStorage.removeItem('username');
            localStorage.setItem('isAuth', 0);
            //navigate('/login');
      }
    } ).catch(
       (error)=>{
             console.log(error);
             
       }
   );
   
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.setItem('isAuth', 0);
    navigate("/login");
  };

  const loginActionOffline = async  (data) => {
   
    UserDao.login(data).then(

        (response)=>{

            if(response){
                 setToken("localtoken");
                 localStorage.setItem('isAuth', 1);
                 localStorage.setItem('user_id', response.id);
                  // get open register from idexddb by connected user 
                   CaisseRegisterDao.getOpenRegisterByUserId(response.id).then(
     
                     (rep) => {
                       if (rep) {
                         localStorage.setItem("isOpen" , 1 );
                         navigate('/pos');
                       }else {
                         localStorage.setItem("isOpen" ,  0);
                         navigate('/caisse');
                       }
                     }
               )
             

            }else {

                  setToken("localtoken");
                  localStorage.setItem('isAuth', 0);
                  localStorage.removeItem('user_id');
                  
            }


        }


    ) ;
    
  }


 
  return (
    <AuthContext.Provider value={{ token, user , loginAction, logOut  ,loginActionOffline  }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};