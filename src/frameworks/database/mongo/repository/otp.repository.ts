import otpModel from "../models/otpModel";
import { IOtp } from "../../../../entity/otp";
import { IOtpRepository } from "../../../../useCase/interface/repository/otpRepository";
import {error} from 'console'
export class OtpRepository  implements IOtpRepository{

    // create otp collection 
    async createOtpUserCollection(newUser:IOtp):Promise<IOtp>{
        try{
            const result = await otpModel.create(newUser)
            return result
        }catch(error:any){
            throw (error)
        }
    }

    //
    async findUser(email: string): Promise<IOtp | null> {
        try{
            let result = await otpModel.findOne({email})
            console.log('otp from otpmodel :',result);
            return result
        }catch(error:any){
            throw (error)
        }
    }
}
