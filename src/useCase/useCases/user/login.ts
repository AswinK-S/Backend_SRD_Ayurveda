import { IUserRepository } from "../../interface/repository/userRepository";
import { Iuser } from "../../../entity/userEntity";

export const login = async(
    userRepository:IUserRepository,
    email:string,
    password:string
):Promise <{user:Iuser}|void> =>{
    try{
        const user = await userRepository.findUsersByEmail(email)
        if(!user){
            console.log('invalid email');
        }
        if(user && user.password == password){
            return {user}
        }
    }catch(error:any){
        console.log(error.message);
    }
}