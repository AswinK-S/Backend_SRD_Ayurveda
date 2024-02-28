import { IUserUseCase } from "../useCase/interface/useCase/userUseCase";
import { Req,Res,Next } from "../frameworks/types/serverPackageTypes";

import ErrorHandler from "../useCase/middleware/errorHandler";



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
        
        res.cookie('verificationToken',token,{
          httpOnly:true,
          sameSite:'strict',
          expires: new Date(Date.now() + 10 * 60* 1000)
        })

        res.status(200).json({
          success: true,
          message: "verification otp has been sent the mail",
        });

      }catch(err:any){
        return next(new ErrorHandler(err.status,err.message))
      }
    }

    //-----------------------------------------------------login
    async login(req: Req, res: Res) {
        try {
          console.log("req came from login");
          const result = await this.userUseCase.login(req.body);
          console.log('res login',result);
          res.status(200).json(result?.user);
        } catch (error: any) {
         console.log(error.message);
        }
      }

   
      

}