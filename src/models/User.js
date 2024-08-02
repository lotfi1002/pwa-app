class User {
    constructor(
        id, 
        last_ip_address, 
        ip_address, 
        username, 
        password,
        lpassword,
        salt, 
        email, 
        activation_code, 
        forgotten_password_code, 
        forgotten_password_time, 
        remember_code, 
        created_on, 
        last_login, 
        active, 
        first_name, 
        last_name, 
        company, 
        phone, 
        avatar, 
        gender, 
        group_id, 
        warehouse_id, 
        biller_id, 
        company_id, 
        show_cost, 
        show_price, 
        award_points, 
        view_right, 
        edit_right, 
        allow_discount
    ) {
        this.id = id;
        this.last_ip_address = last_ip_address;
        this.ip_address = ip_address;
        this.username = username;
        this.password = password;
        this.lpassword = lpassword ;
        this.salt = salt;
        this.email = email;
        this.activation_code = activation_code;
        this.forgotten_password_code = forgotten_password_code;
        this.forgotten_password_time = forgotten_password_time;
        this.remember_code = remember_code;
        this.created_on = created_on;
        this.last_login = last_login;
        this.active = active;
        this.first_name = first_name;
        this.last_name = last_name;
        this.company = company;
        this.phone = phone;
        this.avatar = avatar;
        this.gender = gender;
        this.group_id = group_id;
        this.warehouse_id = warehouse_id;
        this.biller_id = biller_id;
        this.company_id = company_id;
        this.show_cost = show_cost;
        this.show_price = show_price;
        this.award_points = award_points;
        this.view_right = view_right;
        this.edit_right = edit_right;
        this.allow_discount = allow_discount;
    }

    static from(json) {
        return Object.assign(new User(), json);
    }
}

export default User;