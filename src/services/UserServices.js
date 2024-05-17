import { db } from "../models/db";
import User from "../models/User";
import api from "../utilities/Api";
import { BASE_URL } from "../utilities/Params";

class UserServices {


// get users if connected to the backend 
static async getUsers(action)   {
    return api.get(BASE_URL+action) ;
       
      }
      

}

export default UserServices;