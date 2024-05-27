class User {

    constructor( id , username , password , email , lpassword , gender){

        this.id= id ;
        this.username = username ;
        this.password = password ;
        this.email = email ;
        this.lpassword = lpassword ;
        this.gender = gender ;
    }


    static from(json){
        return Object.assign(new User(), json);
      }
}

export default User ;