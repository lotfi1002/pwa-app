import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utilities/Api";
import { BASE_URL } from "../utilities/Params";
const AuthContext = createContext();


const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const loginAction = async (data) => {
   
      // get jwt from backend through credentials
 
       // Convert the JSON object into a query string
      await api.put(BASE_URL+`api/auth` , data ).then( (response)=>{
        const { token, status , resp , user } = response.data;
        console.log(response);

        if(status === true){// good response from web method
            setUser(user);
            setToken(token);
            localStorage.setItem('token', token);
            localStorage.setItem('user', user);
            // redirection 
            navigate("/dashboard");

        }else{ // bad response from web method
    
            setUser(null);
            setToken("");
            localStorage.removeItem('token');
      localStorage.removeItem('user');

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
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};