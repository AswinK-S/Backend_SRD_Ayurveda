import { IOtp } from "../../../../entity/otp";
import { IOtpRepository } from "../../../interface/repositoryIntrfce/otpRepository";


export const  createOtpUserCollection = async   (otpRepository:IOtpRepository,iOtpUser:IOtp)=>{
    const result = await otpRepository.createOtpUserCollection(iOtpUser)
}