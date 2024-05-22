import { db } from "../models/db";

class CaisseRegisterDao{


    static async getOpenRegisterByUserId(user_id) {
        try {
            const result = await db.pos_register.where({
                user_id: user_id,
                status: 'open'
            }).first(); // `first` is equivalent to limiting the result to 1
            return result;
        } catch (error) {
            console.error('Error querying pos_register:', error);
            return null;
        }
    }

    static async openRegister(data ){
        db.pos_register.add(data);
    }

    static async updateRegister(user_id , data ){
        return await db.pos_register.update(user_id , {'cash_in_hind':data.cash_in_hind});
        //db.pos_register.update(register.id , register);
    }

    static async getOneRegister(user_id){

        return await db.pos_register.where({
            user_id:user_id
        }).first();

        
    }
}

export default CaisseRegisterDao ;