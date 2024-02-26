import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IUserRepository } from "../../interface/repository/userRepository";
import { ICreateOtp } from "../../interface/services/createOtp";
import { ISendMail } from "../../interface/services/sendMail";
import ErrorHandler from "../../middleware/errorHandler";

export const registerUser = async(
    userRepository:IUserRepository,
    sendMail:ISendMail,
    otpGenerator:ICreateOtp,
    name:string,
    email:string,
    mob:number,
    password:string | Promise<string >,
    next:Next
    ):Promise <string| void > =>{
        try{
            // checking whether the user exists in the same email
            const isUserExistInMail = await userRepository.findUsersByEmail(email)
            console.log('isEmailExist :',isUserExistInMail);
            if(isUserExistInMail){
                return next(
                    new ErrorHandler(400, "user!!! already exist in the same mail id")
                )
            }else{
                const otp = await otpGenerator.generateOtp()
                await sendMail.sendEmailVerification(name,email,otp)
            }

        }catch(error:any){
            console.log("register user error",error.message);
            return next(
                new ErrorHandler(500,error.message)
            )
        }
    }
