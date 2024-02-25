import { Iuser } from "../../../entity/userEntity";

export interface IUserUseCase {
    
    login({email,password}:{email:string;password:string}):Promise <{user:Iuser} | void>

    
}