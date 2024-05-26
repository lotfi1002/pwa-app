import api from "../utilities/Api";
import { BASE_URL } from "../utilities/Params";

class OtherServices {


    // get users if connected to the backend 
static async chekToken(action)   {
    return api.get(BASE_URL+action) ;
       
      }


}


export default OtherServices;