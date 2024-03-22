import { Iuser } from "../../../entity/userEntity";
import { Iadmin } from "../../../entity/adminEntity";
import { IDoctor } from "../../../entity/doctorEntity";

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

export interface IDoctorJwt{
    createVerificationJwt(payLoad:IDoctor):Promise<string>

    createAccessAndRefreshToken(id:string,role:string):Promise<IToken>

    verifyDocJwt(token:string):Promise<|IDoctor|
        {
        doctorId:string;
        email:string;
        iat:number;
        exp:number;
    }>
}