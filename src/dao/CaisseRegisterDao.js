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
}

export default CaisseRegisterDao ;