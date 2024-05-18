import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utilities/Api";
import { BASE_URL } from "../utilities/Params";
import { db } from "../models/db";
import bcrypt from 'bcryptjs';

const AuthContext = createContext();

const config = {
  hash_method: 'sha1',  // Make sure this is set to either 'sha1' or 'bcrypt'
  default_rounds: 8,    // This does not apply if random_rounds is set to true
  random_rounds: false,
  min_rounds: 5,
  max_rounds: 9
};

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const loginAction = async (data) => {
      // get jwt from backend through credentials
 
       // Convert the JSON object into a query string
        await api.put(BASE_URL+`api/auth` , data ).then( (response)=>{
        const { token, status  , user } = response.data;
        //console.log(response);

        if(status === true){// good response from web method
            setToken(token);
            localStorage.setItem('token', token);
            localStorage.setItem('user', user);
            localStorage.setItem('isAuth', 1);
            navigate('/dashboard');
           

        }else{ // bad response from web method
            setUser(null);
            setToken("");
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.setItem('isAuth', 0);

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

    // bycrypt password 

    try {
      let rounds = config.default_rounds;
      if (config.random_rounds) {
        rounds = Math.floor(Math.random() * (config.max_rounds - config.min_rounds + 1)) + config.min_rounds;
      }
      const salt = await bcrypt.genSalt(rounds);
      const hash = await bcrypt.hash(data.password, salt);
      console.log(hash);

    } catch (error) {
      console.error('Error hashing password:', error);
    }

// request to fin user in indexdb 
    const user = await db.user.where("username")
    .equals(data.username)
    .first();
    if (user != null) setToken("localtoken");
    return (user != null)? true: false ; 
  }

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut  ,loginActionOffline }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};