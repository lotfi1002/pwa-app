
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
                  
                  return true ;
                }
              }
      
             ).catch((error)=>{ console.log(error);

              return true ;

             }); ;
          }
          
    }
    
    export default CaisseRegisterServices;