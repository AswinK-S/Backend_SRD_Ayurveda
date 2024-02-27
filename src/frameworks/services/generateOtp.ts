
import { ICreateOtp } from "../../useCase/interface/services/createOtp";

export class GenerateOtp implements ICreateOtp{

    async generateOtp(): Promise<string>{
        const stringNum ='0123456789'
        let otp=''
        for(let i=0;i<4;i++){
            const randomIndex = Math.floor(Math.random() * stringNum.length);
            otp += stringNum[randomIndex]
        }
        console.log('otp generated');
        return otp
    }
}