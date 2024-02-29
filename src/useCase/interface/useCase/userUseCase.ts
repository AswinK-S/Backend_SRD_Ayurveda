import { Iuser } from "../../../entity/userEntity";
import { Next,Req,Res } from "../../../frameworks/types/serverPackageTypes";
import { IToken } from "../services/jwt.types";

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


    //create user 
    createUser(
        verificationCode:string,
        token:string,
        next:Next
        ):Promise<Iuser|void>

    // userlogin
    login({email,password}:{email:string;password:string},next:Next):Promise <{user:Iuser;tokens:IToken} | void>



    
}