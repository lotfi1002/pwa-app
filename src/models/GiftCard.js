class GiftCard {

    constructor(id, date, card_no, value, customer_id, customer, balance, expiry, created_by, note) {
        this.id = id;
        this.date = date;
        this.card_no = card_no;
        this.value = value;
        this.customer_id = customer_id;
        this.customer = customer;
        this.balance = balance;
        this.expiry = expiry;
        this.created_by = created_by;
        this.note = note;
    }

    static from(json) {
        return Object.assign(new GiftCard(), json);
    }
}

export default GiftCard;