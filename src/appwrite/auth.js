import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";






class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl) // Your API Endpoint
        .setProject(conf.appwriteProjectId);               // Your project ID
        this.account = new Account(this.client);
    }

    async signup({email,password,name}){
       try{
        const userAccount = await this.account.create(ID.unique(), email, password,name);
        if(userAccount){
            this.login({email,password});
        }else{
            return userAccount;
        }
       }catch(err){
        throw err
       }
       
    }

    async login({email,password}){
        try{
          return await this.account.createEmailSession(email, password);
        }catch(err){
            throw err;
        }
    }

    async getCurrentUser(){

        try{
            return await this.account.get();
        }catch(err){
            console.log("Appwrite service :: getCurrentUser :: error",err);
        }
        return null;

    }

    async logout(){
        try{
            await account.deleteSessions();
        }catch(err){
            console.log("Appwrite service :: logout :: error", error);
        }
    }

}


const authService = new AuthService();

    

export default authService;

