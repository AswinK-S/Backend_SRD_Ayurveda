import { IUserUseCase } from "../useCase/interface/IntrfcUseCase/userUseCase";
import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";

import ErrorHandler from "../useCase/middleware/errorHandler";

import {
  accessTokenOptions,
  refreshTokenOptions
} from "../frameworks/middlewares/tokenOptions";
import { IadminUseCase } from "../useCase/interface/IntrfcUseCase/adminUseCase";




export class UserController {
  private userUseCase: IUserUseCase;
  private adminUseCase: IadminUseCase;

  constructor(userUseCase: IUserUseCase, adminUseCase: IadminUseCase) {
    this.userUseCase = userUseCase;
    this.adminUseCase = adminUseCase;
  }

  //--------------------------------------------------get treatments
  async treatments(req: Req, res: Res, next: Next) {
    try {
      console.log('req in cntrlr');
      const result = await this.adminUseCase.getTreatmentUsecase(req, next)
      console.log('trtmnt in usr cntrlr--', result);

      if (result) {

        const trt: any[] = result.map((dat) => {
          return {
            ...dat,
            subTreatments: dat.subTreatments.filter((dat1:any) => dat1.status === true),
          };
        });

        console.log('ttttttttttttt', trt);
      }

      res.status(200).json(result)
    } catch (error: any) {
      console.log('err in cntrlr');
      return next(new ErrorHandler(500, error.message))
    }
  }


  //-----------------------------------------------------register
  async registerUser(req: Req, res: Res, next: Next) {
    try {
      console.log("register data came ", req.body);

      const token = await this.userUseCase.registerUser(req.body, next)
      console.log('tkn while regtrng Usrcntrlr', token);

      res.cookie('verificationToken', token, {
        
        httpOnly: true,
        sameSite: 'none',
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })




      res.status(200).json({
        success: true,
        message: "verification otp has been sent the mail",
      });

    } catch (err: any) {
      return next(new ErrorHandler(err.status, err.message))
    }
  }


  //------------------------------------------------------creating user
  async createUser(req: Req, res: Res, next: Next) {
    try {
      console.log(req.cookies)
      let token = req.cookies.verificationToken as string || ''
      console.log('token saved in cookies :', token);


      const result = await this.userUseCase.createUser(
        req.body.verificationCode,
        token,
        next
      )
      res.clearCookie('verificationToken').send(result)
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message))
    }
  }

  //-----------------------------------------------------login
  async login(req: Req, res: Res, next: Next) {
    try {
      console.log("req came from login");
      const result = await this.userUseCase.login(req.body, next);
      console.log('res login', result);

      res.cookie('accessToken', result?.tokens.accessToken, accessTokenOptions)
      res.cookie('refreshToken', result?.tokens.accessToken, refreshTokenOptions)


      if (result) res.status(200).json({ user: result?.user, token: result.tokens.accessToken, message: 'user logged in ' });
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message))
    }
  }


}