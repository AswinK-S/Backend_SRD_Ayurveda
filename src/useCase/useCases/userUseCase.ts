import { Res,Req,Next } from "../../frameworks/types/serverPackageTypes"; 
import { IUserRepository } from "../interface/repository/userRepository";
import { ICreateOtp } from "../interface/services/createOtp";  
import { ISendMail } from "../interface/services/sendMail";


import { IUserUseCase } from "../interface/useCase/userUseCase";
import { Iuser } from "../../entity/userEntity";
import ErrorHandler from "../middleware/errorHandler";
import { login,registerUser } from "./user/index";

export class UserUseCase implements IUserUseCase{

    private readonly userRepository : IUserRepository;
    private readonly otpGenerator:ICreateOtp;
    private readonly sendMail:ISendMail;

    constructor(  
      userRepository:IUserRepository,
      otpGenerator:ICreateOtp,
      sendMail:ISendMail
        )
    { 
      this.userRepository = userRepository,
      this.otpGenerator = otpGenerator,
      this.sendMail = sendMail
     }

    // user register-----------------------------------------------------

    async registerUser({ 
      name, email, mob, password 
    }:{ name: string; email: string; mob: number; password: string; },next: Next): Promise<string | void> {
     try{
      let result = await registerUser(
        this.userRepository,
        this.sendMail,
        this.otpGenerator,
        name,
        email,
        mob,
        password,
        next
      )
      return result
     }catch(error:any){
      console.log(error.message);
     } 
    }
    
    // login--------------------------------------------------------------

    async login(
        { email, password }: { email: string; password: string },
      ): Promise<{ user: Iuser} | void> {
        try {
            return await login(
                this.userRepository,
                email,
                password,
              );
        } catch (error: any) {
          console.log(error.message);
          throw error;
        }
      }
}