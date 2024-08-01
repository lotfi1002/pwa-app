import api from "../utilities/Api";
import { BASE_URL } from "../utilities/Params";

class ProductServices {
  // get all suggestion to search offline
  static async getProductsForSuggestions(action) {
    return await api.put(BASE_URL + action);
  }

  static async getProductsData(action) {
    return await api.put(BASE_URL + action);
  }
}

export default ProductServices;
