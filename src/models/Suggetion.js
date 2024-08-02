class Suggestion {
    constructor(id, label, code, name, price, qty, variants) {
        this.id = id;
        this.label = label;
        this.code = code;
        this.name = name;
        this.price = price;
        this.qty = qty;
        this.variants = variants;
    }

    static from(json) {
        return Object.assign(new Suggestion(), json);
    }
}

export default Suggestion;
