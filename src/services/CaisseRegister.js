import api from "../utilities/Api";
import { BASE_URL } from "../utilities/Params";

class CaisseRegisterServices {


    // get users if connected to the backend 
    static async chekCaisse(action="api/caisse/check" , data)   {
        return api.put(BASE_URL+action , data) ;
           
          }
          
    
    }
    
    export default CaisseRegisterServices;