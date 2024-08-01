import { db } from "../models/db";

class GiftCardDao{


    static async putGiftCard(data){

        return await db.gift_card.put(data);

    }


    static async getAllGiftCards() {
        return await db.gift_card.toArray();
    }
    


    static async getGiftCardByCode(card_no) {
        try {
            return await db.gift_card.where('card_no').equals(card_no).first();
          } catch (error) {
            console.error('Error fetching Gift Card by code:', error);
            throw error;
          }
    }

}

export default GiftCardDao ;