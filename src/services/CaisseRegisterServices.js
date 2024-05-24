
import api from "../utilities/Api";
import { BASE_URL } from "../utilities/Params";

class CaisseRegisterServices {


    // get users if connected to the backend 
    static async chekCaisse(action="api/caisse/check" , data)   {
            
            return await   api.put(BASE_URL+action , data);

           
          }
          
// open caisse backend 
      static async openCaisse(action="api/caisse/open_caisse" , data){

            return await api.put(BASE_URL+action , data);
      
        }

        static async closeCaisse(action="api/caisse/close_caisse" , data){

            return await api.put(BASE_URL+action , data);
      
        }

    }
    
   

    export default CaisseRegisterServices;