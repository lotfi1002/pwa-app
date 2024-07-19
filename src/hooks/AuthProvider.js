import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utilities/Api";
import { BASE_URL } from "../utilities/Params";
import UserServices from "../services/UserServices";
import User from "../models/User";
import UserDao from "../dao/UserDao";
import CryptoJS from "crypto-js";
import CaisseRegisterDao from "../dao/CaisseRegisterDao";
import CaisseRegisterServices from "../services/CaisseRegisterServices";
import DateTime from "../utilities/DateTime";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const loginAction = async (action="api/auth" ,data) => {
      // get jwt from backend through credentials
       // Convert the JSON object into a query string
      api.put(BASE_URL+action , data ).then( (response)=>{
        const { token, status  , user } = response.data;
        console.log("I'm here" + token);
        if(status === true){
          // good response from web method
            setToken(token);
            localStorage.setItem('token', token);
            localStorage.setItem('user_id', user.id);
            localStorage.setItem('isAuth', 1);
            localStorage.setItem('connected_at' , DateTime.getCurrentDateTime());

            // get all users from backend
            UserServices.getUsers("api/users/all").then( (rep) => {
              const {status,response } = rep.data;
              if(status){
               if(response != null ) {
                          response.forEach((el)=>{
                               // save user in indexd db database
                               if( data.username.localeCompare(el.username)!==0){
                                console.log(data)
                                UserDao.putUser(new User(el.id , el.username , el.password , el.email , '' , el.gender));
                              }else{
                                // crypted password
                                const hash = CryptoJS.SHA1(data.password,CryptoJS.enc.Utf8).toString(CryptoJS.enc.Hex);
                               UserDao.putUser(new User(el.id , el.username , el.password , el.email , hash, el.gender));
                              }
                          } )   ;  }

                        }

                        });

            // caisse verification
            // get  Registre from indexddb by connected user
            CaisseRegisterDao.getOpenRegisterByUserId(user.id).then(

                  (response)=>{

                    let cUser = response ;

                    if (response) {

                      // check the backend if not exist or closed open a new register

                      CaisseRegisterServices.chekCaisse("api/caisse/check" ,  {'user_id':user.id}).then(

                        (rep)=>{
                          const {status , response} = rep.data;
                            if(status){
                            if(response === false){

                                // open a new register in backend
                                let data =  {
                                  "id": cUser.id,
                                  "user_id" : cUser.user_id,
                                  "cash_in_hand":cUser.cash_in_hand,
                                  "date" : cUser.date,
                                  "status":cUser.status,
                                  "commit": 1
                                };

                                CaisseRegisterServices.openCaisse( "api/caisse/open_caisse", data);

                            }

                          }
                        }

                      ) ;

                      localStorage.setItem("isOpen" , 1 );
                      navigate('/pos');
                    }else {

                      // check the backend
                      CaisseRegisterServices.chekCaisse("api/caisse/check" ,  {'user_id':user.id}).then(

                          (rep)=>{
                            const {status , response} = rep.data;
                              if(status){
                              if(response === false){

                                localStorage.setItem("isOpen" , 0);
                                navigate('/caisse');

                              }else{// open caisse from backend in indexdb

                                let data =  {
                                  "id": response.id,
                                  "user_id" : response.user_id,
                                  "cash_in_hand":response.cash_in_hand,
                                  "date" : response.date,
                                  "status":response.status,
                                  "commit": 1
                                };
                                // add information from the backend to pos_register (indexddb)
                                CaisseRegisterDao.saveOrRegister(data.user_id , data);
                                //CaisseRegisterDao.openRegister(data);
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
            localStorage.removeItem('connected_at');
            localStorage.setItem('isAuth', 0);
            //navigate('/login');
      }
    } ).catch(
       (error)=>{
             console.log(error);

       }
   );

  };

  // const loginAction = async (action = "api/auth", data) => {
  //   // get jwt from backend through credentials
  //   // Convert the JSON object into a query string
  //   api
  //     .put(BASE_URL + action, data)
  //     .then((response) => {
  //       const { token, status, user } = response.data;
  //       if (status === true) {
  //         // good response from web method
  //         setToken(token);
  //         localStorage.setItem("token", token);
  //         localStorage.setItem("user_id", user.id);
  //         localStorage.setItem("isAuth", 1);
  //         localStorage.setItem("connected_at", DateTime.getCurrentDateTime());

  //         CaisseRegisterServices.chekCaisse("api/caisse/check", {
  //           user_id: user.id,
  //         }).then((rep) => {
  //           const { status, response } = rep.data;
  //           if (status) {
  //             if (response === false) {
  //               localStorage.setItem("isOpen", 0);
  //               navigate("/caisse");
  //             } else {
  //               localStorage.setItem("isOpen", 1);
  //               navigate("/pos");
  //             }
  //           }
  //         });
  //       } else {
  //         // bad response from web method

  //         setUser(null);
  //         setToken("");
  //         localStorage.removeItem("token");
  //         localStorage.removeItem("user_id");
  //         localStorage.removeItem("connected_at");
  //         localStorage.setItem("isAuth", 0);
  //         //navigate('/login');
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    localStorage.removeItem("connected_at");
    localStorage.setItem("isAuth", 0);
    navigate("/login");
  };

  const loginActionOffline = async (data) => {
    UserDao.login(data).then((response) => {
      if (response) {
        setToken("localtoken");
        localStorage.setItem("isAuth", 1);
        localStorage.setItem("user_id", response.id);
        localStorage.setItem("connected_at", DateTime.getCurrentDateTime());
        // get open register from idexddb by connected user
        CaisseRegisterDao.getOpenRegisterByUserId(response.id).then((rep) => {
          if (rep) {
            localStorage.setItem("isOpen", 1);
            navigate("/pos");
          } else {
            localStorage.setItem("isOpen", 0);
            navigate("/caisse");
          }
        });
      } else {
        setToken("");
        localStorage.setItem("isAuth", 0);
        localStorage.removeItem("user_id");
        localStorage.removeItem("connected_at");
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{ token, user, loginAction, logOut, loginActionOffline }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
