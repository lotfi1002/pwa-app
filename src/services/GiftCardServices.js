import api from "../utilities/Api";
import { BASE_URL } from "../utilities/Params";

class GiftCardServices {
  

  static async getGiftCards(action) {
    return await api.put(BASE_URL + action);
  }
}

export default GiftCardServices;