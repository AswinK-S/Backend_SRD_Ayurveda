import { Iuser } from "../../../entity/userEntity";
import { Next,Req,Res } from "../../../frameworks/types/serverPackageTypes";

export interface IUserUseCase {

    // register user data type specifiying 
    registerUser(
    {
        name,
        email,
        mob,
        password
    }:{
        name:string,
        email:string,
        mob:number,
        password:string
    },
    next:Next
    ):Promise<string | void>

    // userlogin
    login({email,password}:{email:string;password:string}):Promise <{user:Iuser} | void>

    
}