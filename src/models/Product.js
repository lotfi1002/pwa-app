class Product{

    constructor(id, item_id, label, category, row, combo_items, tax_rate, units, options,code) {
        this.id = id;
        this.label = label;
        this.item_id = item_id;
        this.category = category;
        this.combo_items = combo_items;
        this.row = row;
        this.tax_rate = tax_rate;
        this.units = units;
        this.options = options;
        this.code = code;
      }
    
      static from(json) {
        return Object.assign(new Product(), json);
      }
            

}

export default Product ;