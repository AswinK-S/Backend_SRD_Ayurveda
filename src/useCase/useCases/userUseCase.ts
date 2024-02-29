import { Res,Req,Next } from "../../frameworks/types/serverPackageTypes"; 
import { IUserRepository } from "../interface/repository/userRepository";
import { ICreateOtp } from "../interface/services/createOtp";  
import { ISendMail } from "../interface/services/sendMail";
import { IOtpRepository } from "../interface/repository/otpRepository";

import { IUserUseCase } from "../interface/useCase/userUseCase";
import { Iuser } from "../../entity/userEntity";
import { IToken,IJwt } from "../interface/services/jwt.types";
import { catchError } from "../middleware/catchError";
import { IHashPassword } from "../interface/services/hashPassword";


import { 
  login,
  registerUser,
  createUser 
} from "./user/index";

export class UserUseCase implements IUserUseCase{

    private readonly userRepository : IUserRepository;
    private readonly otpGenerator:ICreateOtp;
    private readonly sendMail:ISendMail;
    private readonly otpRepository:IOtpRepository;
    private readonly bcrypt:IHashPassword;
    private readonly jwtToken:IJwt;


    constructor(  
      userRepository:IUserRepository,
      otpGenerator:ICreateOtp,
      sendMail:ISendMail,
      otpRepository:IOtpRepository,
      jwtToken:IJwt,
      bcrypt:IHashPassword,
    ) 
    { 
      this.userRepository = userRepository;
      this.otpGenerator = otpGenerator;
      this.sendMail = sendMail;
      this.otpRepository = otpRepository;
      this.jwtToken = jwtToken;
      this.bcrypt = bcrypt;
    }
    // user register-----------------------------------------------------

    async registerUser(
      { 
      name,
      email, 
      mob, 
      password, 
    }:{ 
      name: string; 
      email: string; 
      mob: number; 
      password: string; 
    },
    next: Next
    ): Promise< string | void> {
     try{
      let result = await registerUser(
        this.userRepository,
        this.sendMail,
        this.otpGenerator,
        this.otpRepository,
        this.bcrypt,
        this.jwtToken,
        name,
        email,
        mob,
        password,
        next
      )
      return result
     }catch(error:unknown){
      catchError(error,next)
     } 
    }


    //createuser
    async createUser(
      verificationCode:string,
      token:string,
      next:Next,
    ):Promise<Iuser |void>{
      try{
       return await createUser(
        this.userRepository,
        this.otpRepository,
        this.jwtToken,
        verificationCode,
        token,
        next
       )
      }catch(error:unknown){
        catchError(error,next)
      }
    }
    
    // login--------------------------------------------------------------

    async login(
        { email, password }: { email: string; password: string },next:Next
      ):Promise<{ user: Iuser; tokens: IToken} | void> {
        try {
            return await login(
                this.userRepository,
                this.bcrypt,
                this.jwtToken,
                email,
                password,
                next
              );
        } catch (error:unknown) {
          catchError(error,next)
        }
      }
}
