import { db } from "../models/db";

class CaisseRegisterDao{


    static async getOpenRegisterByUserId(user_id) {
        let user = null ;
        try {
             user = await db.pos_register.where({
                user_id: user_id,
                status: 'open',
            }).first(); // `first` is equivalent to limiting the result to 1
            
        } catch (error) {
            console.error('Error querying pos_register:', error);
            user = null;
        }

        return user ;
    }

    static async openRegister(data ){
        db.pos_register.add(data);
    }

    static async updateRegister(id , data ){
        return await db.pos_register.update(id , data);
        //db.pos_register.update(register.id , register);
    }

    static async getOneRegister(user_id){

        return await db.pos_register.where({
            user_id:user_id
        }).first();

        
    }

    static async   saveOrRegister( user_id , data ){
  
              //in local  
              this.getOpenRegisterByUserId(user_id).then(
  
                (response)=>{
                  if(response){// is exsit and open update it 
                    console.log("update");
            
                    console.log("id : "+response.id);
                    this.updateRegister(response.id , data) ;
                          
                        } else{ // note exist create new one 
                            this.openRegister(data);
                        console.log("add new");
            
                  }
                }
              );
  
  
    }
}

export default CaisseRegisterDao ;