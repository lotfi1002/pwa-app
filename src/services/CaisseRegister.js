
import CaisseRegisterDao from "../dao/CaisseRegisterDao";
import api from "../utilities/Api";
import { BASE_URL } from "../utilities/Params";

class CaisseRegisterServices {


    // get users if connected to the backend 
    static async chekCaisse(action="api/caisse/check" , data)   {
            
             return await api.put(BASE_URL+action , data).then(

              (response) => {

                if(response != null && response.data != null){ 

                      if(response.data.response === false){  
                          localStorage.setItem("isOpen" , 0);
                          return false ;
                }else{

                  localStorage.setItem("isOpen" , 1);  
                  CaisseRegisterDao.getOpenRegisterByUserId(response.data.response.user_id).then(

                    (rep)=>{
                      if(!rep){ // user not exit in indexddb
                        let data =  {
                          "user_id" : response.data.response.user_id,
                          "cash_in_hand":response.data.response.cash_in_hand,
                          "date" : response.data.response.date,
                          "status":response.data.response.status
                        };
                        // add infromation from the backend to pos_register (indexddb)
                        CaisseRegisterDao.openRegister(data);
                      }
                    });
                 
                  return true ;
                }
              }else {

                return false ;
              }
              }
      
             ).catch((error)=>{ console.log(error);

              return false ;

             }); ;
          }
          

          static async openCaisse(action="api/caisse/open_caisse" , data){

            return await api.put(BASE_URL+action , data);
      
          }

    }
    
   

    export default CaisseRegisterServices;