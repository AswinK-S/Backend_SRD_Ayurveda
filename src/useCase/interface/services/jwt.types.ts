import { Iuser } from "../../../entity/userEntity";
import { Req } from "../../../frameworks/types/serverPackageTypes";

export interface IToken{
    accessToken:string,
    refreshToken:string
}


export interface IJwt{
    createVerificationJwt(payLoad:Iuser):Promise:<string>;
    
    createAccessAndRefreshToken(id: string): Promise<IToken>;

    verifyJwt(token: string): Promise<
    | IUser
    | {
        userId: string;
        email: string;
        iat: number;
        exp: number;
      }
  >;
}