import { IUserUseCase } from "../useCase/interface/useCase/userUseCase";
import { Req,Res,Next } from "../frameworks/types/serverPackageTypes";

import ErrorHandler from "../useCase/middleware/errorHandler";

import { 
  accessTokenOptions,
  refreshTokenOptions 
} from "./middlewares/tokenOptions";
import { IToken } from "../useCase/interface/services/jwt.types";



export class UserController{
    private userUseCase : IUserUseCase;

    constructor(userUseCase : IUserUseCase){
        this.userUseCase = userUseCase
    }

    //-----------------------------------------------------register
    async registerUser(req:Req,res: Res,next:Next){
      try{
        console.log("register data came ",req.body);
        
        const token = await this.userUseCase.registerUser(req.body,next)
        console.log('tkn while regtrng Usrcntrlr',token);

        res.cookie('verificationToken',token,{
          // httpOnly:true,
          // sameSite:'strict',
          // expires: new Date(Date.now() + 10 * 60* 1000)
          httpOnly: true,
                    sameSite: 'none',
                    secure : process.env.NODE_ENV !== 'development',
                    maxAge: 30 * 24 * 60 * 60 * 1000 , 
        })


       

        res.status(200).json({
          success: true,
          message: "verification otp has been sent the mail",
        });

      }catch(err:any){
        return next(new ErrorHandler(err.status,err.message))
      }
    }


    //------------------------------------------------------creating user
    async createUser(req:Req,res:Res,next:Next){
      try{
        console.log(req.cookies)
        let  token = req.cookies.verificationToken as string || ''
        console.log('token saved in cookies :',token);
        

        const result = await this.userUseCase.createUser(
          req.body.verificationCode,
          token,
          next
        )
          res.clearCookie('verificationToken').send(result)
      }catch(error:any){
        return next (new ErrorHandler(500,error.message))
      }
    }

    //-----------------------------------------------------login
    async login(req: Req, res: Res,next:Next) {
        try {
          console.log("req came from login");
          const result = await this.userUseCase.login(req.body,next);
          console.log('res login',result);

          res.cookie('accessToken',result?.tokens.accessToken,accessTokenOptions)
          res.cookie('refreshToken',result?.tokens.accessToken,refreshTokenOptions)


          res.status(200).json({user:result?.user,message:'user logged in '});
        } catch (error: any) {
          return next (new ErrorHandler(500,error.message))
        }
      }
      

}