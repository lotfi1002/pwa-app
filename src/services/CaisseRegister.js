
import CaisseRegisterDao from "../dao/CaisseRegisterDao";
import api from "../utilities/Api";
import { BASE_URL } from "../utilities/Params";

class CaisseRegisterServices {


    // get users if connected to the backend 
    static async chekCaisse(action="api/caisse/check" , data)   {
            
             return await api.put(BASE_URL+action , data).then(

              (response) => {
                console.log(response);
                if(response != null && response.data != null 
                        &&response.data.response === false){  
                          localStorage.setItem("isOpen" , 0);
                          return false ;
                }else{
                    localStorage.setItem("isOpen" , 1);  
                    if(CaisseRegisterDao.getOpenRegisterByUserId(data.user_id) === null)
                      CaisseRegisterDao.openRegister(response.data.response);
                    return true ;
                }
              }
      
             ).catch((error)=>{ console.log(error);

              return true ;

             }); ;
          }
          

          static async openCaisse(action="api/caisse/open_caisse" , data){

            return await api.put(BASE_URL+action , data);
      
          }

    }
    
   

    export default CaisseRegisterServices;