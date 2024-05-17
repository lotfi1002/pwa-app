class User {

    constructor( id , username , password , email){

        this.id= id ;
        this.username = username ;
        this.password = password ;
        this.email = email ;
    }


    static from(json){
        return Object.assign(new User(), json);
      }
}

export default User ;