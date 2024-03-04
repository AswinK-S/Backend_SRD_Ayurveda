import { IOtp } from "../../../../@types/entity/otp";
import { IOtpRepository } from "../../../interface/repository/otpRepository";


export const  createOtpUserCollection = async   (otpRepository:IOtpRepository,iOtpUser:IOtp)=>{
    const result = await otpRepository.createOtpUserCollection(iOtpUser)
}