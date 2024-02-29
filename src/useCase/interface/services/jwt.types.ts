import { Iuser } from "../../../entity/userEntity";

export interface IToken{
    accessToken:string;
    refreshToken:string;
}


export interface IJwt{
    createVerificationJwt(payLoad:Iuser):Promise<string>;
    
    createAccessAndRefreshToken(id: string): Promise<IToken>;

    verifyJwt(token: string): Promise< | Iuser | {
        userId: string;
        email: string;
        iat: number;
        exp: number;
      }
  >;
}