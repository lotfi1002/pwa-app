import { db } from "../models/db";
import CryptoJS from 'crypto-js';

class UserDao{

    static async putUser(data){

        return await db.user.put(data);
    }

    static async addUser(data){

        return await db.user.add(data);
    }

    static async getUserByUsername(user_name){

        return await db.user.where("username")
        .equals(user_name)
        .first() ;
    }

    static async UpdateUser(id , data ){
            //console.log(response);
            db.user.update(id,data).then( (updated)=> {
                if (updated)
                  console.log ("User Updated : "+ id);
                else
                  console.log ("Nothing was updated");
              }) ;  
            
          
        
    }


    static async login(data){

        let user = null  ;
        try {
                // request to fin user in indexdb 
            
                user = await db.user.where("username")
                .equals(data.username)
                .first();
            
                if (user != null){
            
                const hash = CryptoJS.SHA1(data.password,CryptoJS.enc.Utf8).toString(CryptoJS.enc.Hex);
                // hash password verification 
            
                        if (hash === user.lpassword) {
                        
                         console.log("Passwords match!");
                    } else {
                        user = null ;
                        console.log("Passwords don't match!");
                    }
                }   
            
                } catch (error) {
                    user = null ;
                        console.error("Error hashing password:", error);
                       
                }
    
        return user ;


    }

}


export default UserDao;