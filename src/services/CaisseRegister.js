import api from "../utilities/Api";
import { BASE_URL } from "../utilities/Params";

class CaisseRegisterServices {


    // get users if connected to the backend 
    static async chekCaisse(action="api/caisse/check")   {
        return api.get(BASE_URL+action) ;
           
          }
          
    
    }
    
    export default CaisseRegisterServices;