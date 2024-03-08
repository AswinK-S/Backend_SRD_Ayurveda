import { Iuser } from "../../@types/entity/userEntity";
import { IToken,IJwt, IadminJwt, IDoctorJwt } from "../../useCase/interface/services/jwt.types";
import { Iadmin } from "../../@types/entity/adminEntity";

import jwt from 'jsonwebtoken'
import { IDoctor } from "../../@types/entity/doctorEntity";
require('dotenv').config()

export class    JWTtoken implements IJwt,IadminJwt,IDoctorJwt {

    Jwt_verification_key = process.env.Jwt_verification_key || "";
    Jwt_access_key = process.env.Jwt_access_key || "";
    Jwt_refresh_key = process.env.Jwt_refresh_key || "";
    
    //---------------------------
    async createVerificationJwt(payLoad:Iuser):Promise<string>  {
        const verifyToken = await jwt.sign(payLoad,this.Jwt_verification_key,{expiresIn:'15m'})
        return verifyToken
    }

    //-------------------------------------------
    async createAccessAndRefreshToken(_id:string,role:string):Promise<IToken>{

        const accessToken =  await jwt.sign({id:_id,role},this.Jwt_access_key,{expiresIn:'5h'})

        const refreshToken = await jwt.sign({id:_id,role},this.Jwt_refresh_key,{expiresIn:'3d'})

        return {accessToken,refreshToken}
    }


    async verifyJwt(token: string): Promise<Iuser> {
        return (await jwt.verify(token, this.Jwt_verification_key)) as Iuser;
    }

    async verifyDocJwt(token:string):Promise<IDoctor>{
        return (await jwt.verify(token,this.Jwt_verification_key)as IDoctor)
    }

}


