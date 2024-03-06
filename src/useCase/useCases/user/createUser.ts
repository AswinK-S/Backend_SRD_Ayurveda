import { IOtpRepository } from "../../interface/repository/otpRepository";
import { IUserRepository } from "../../interface/repository/userRepoIntfc";
import { Iuser } from "../../../@types/entity/userEntity";
import { IJwt } from "../../interface/services/jwt.types";
import { Next } from "../../../frameworks/types/serverPackageTypes";
import ErrorHandler from "../../middleware/errorHandler";

export const createUser = async (
    userRepository:IUserRepository,
    otpRepository:IOtpRepository,
    jwtVerifier:IJwt,
    verificationCode:string,
    token:string,
    next:Next,
)=>{
    try{
        let decode = (await jwtVerifier.verifyJwt(token)) as Iuser
        console.log('create user token verify ',decode);

        if(!decode)
        return next(new ErrorHandler(400,'token has been expired , register again'))
        
        decode.isVerified = true;
        const newUser =await userRepository.createUser(decode)
        newUser.password=''
        return newUser
    }catch(err){
        throw err
    }

}