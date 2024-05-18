import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utilities/Api";
import { BASE_URL } from "../utilities/Params";
import { db } from "../models/db";
import CryptoJS from 'crypto-js';
import UserServices from "../services/UserServices";
import User from "../models/User";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();
  const loginAction = async (data , path) => {
      // get jwt from backend through credentials
       // Convert the JSON object into a query string
      api.put(BASE_URL+`api/auth` , data ).then( (response)=>{
        const { token, status  , user } = response.data;
        if(status === true){
          // good response from web method
            setToken(token);
            localStorage.setItem('token', token);
            localStorage.setItem('user', user);
            localStorage.setItem('isAuth', 1);
            // get all users
            UserServices.getUsers("api/users/all").then( (response) => {
              if(response.data.status){
               if(response.data.response != null ) {
                          response.data.response.forEach((el)=>{
                               console.log(User.from(el))  ;
                               // save user in indexd db database 
                               db.user.add(new User(el.id , el.username , el.password , el.email , '')).then(
                                (response)=>{
                                  console.log("saved in indexdb "+ response);
                                }
                              );
        
                          } )   ;  }}}); 

            // get user form indexd db data base with the same name 

           db.user.where("username")
            .equals(data.username)
            .first().then( (resp)=>{
              //console.log("resp : " + resp);
                 // update local password with crypted one 
              const hash = CryptoJS.SHA1(data.password,CryptoJS.enc.Utf8).toString(CryptoJS.enc.Hex);
              db.user.update(resp.id, {lpassword: hash}).then(function (updated) {
                if (updated)
                  console.log ("Friend number"+ resp.id);
                else
                  console.log ("Nothing was updated");
              });

            }) ;
            navigate(path);

        }else{ // bad response from web method
            setUser(null);
            setToken("");
            localStorage.removeItem('token');
            localStorage.removeItem('user');
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
    localStorage.removeItem("user");
    localStorage.setItem('isAuth', 0);
    navigate("/login");
  };

  const loginActionOffline = async (data) => {

    let flag = false ;
    try {
    // request to fin user in indexdb 

    const user = await db.user.where("username")
    .equals(data.username)
    .first();

    if (user != null){

      const hash = CryptoJS.SHA1(data.password,CryptoJS.enc.Utf8).toString(CryptoJS.enc.Hex);
      // bycrypt password verification 
      //console.log(hash);
      //console.log(user.lpassword);
            if (hash === user.lpassword) {
              setToken("localtoken");
              localStorage.setItem('isAuth', 1);
              flag = true ;
              console.log('Passwords match!');
          } else {
            flag = false ;
              console.log('Passwords do not match!');
          }
    }   

    } catch (error) {
      console.error('Error hashing password:', error);
      flag =  false ;
    }

    return flag ;
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