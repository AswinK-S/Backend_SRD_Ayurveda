import { Iuser } from "../../../entity/userEntity";
import { Iadmin } from "../../../entity/adminEntity";

export interface IToken{
    accessToken:string;
    refreshToken:string;
}


// user's jwtToken
export interface IJwt{
    createVerificationJwt(payLoad:Iuser):Promise<string>;
    
    createAccessAndRefreshToken(id: string,role:string): Promise<IToken>;

    verifyJwt(token: string): Promise< | Iuser | {
        userId: string;
        email: string;
        iat: number;
        exp: number;
      }
  >;
}

//admin's jwtToken
export interface IadminJwt{
    createVerificationJwt(payLoad:Iadmin):Promise<string>

    createAccessAndRefreshToken(id:string,role:string):Promise<IToken>

    verifyJwt(token:string):Promise<|Iadmin |{
        adminId:string;
        email:string;
        iat:number;
        exp:number;
    }>
}