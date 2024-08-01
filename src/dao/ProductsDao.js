import { db } from "../models/db";

class ProductDao{


    static async putSuggestion(data){

        return await db.suggestion.put(data);

    }


    static async getAllSuggetions() {
        return await db.suggestion.toArray();
    }
    
    
    static async getSuggestionsByTerm(term) {
        // Ensure term is trimmed and in lower case for case-insensitive searching
        const trimmedTerm = term.trim().toLowerCase();

        console.log(trimmedTerm);
        // Fetch suggestions where the name or label contains the search term
        return await db.suggestion
            .where('name').startsWithIgnoreCase(trimmedTerm)
            .or('code').startsWithIgnoreCase(trimmedTerm)
            .toArray();
    }


    static async putProduct(data){

        return await db.product.put(data);

    }


    static async getProductByCode(code) {
        try {
            return await db.product.where('code').equals(code).first();
          } catch (error) {
            console.error('Error fetching product by code:', error);
            throw error;
          }
    }

}

export default ProductDao ;