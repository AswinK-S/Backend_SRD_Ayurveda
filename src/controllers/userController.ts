import { IUserUseCase } from "../useCase/interface/useCase/userUseCase";
import { Req,Res } from "../frameworks/types/serverPackageTypes";

export class UserController{
    private userUseCase : IUserUseCase;

    constructor(userUseCase : IUserUseCase){
        this.userUseCase = userUseCase
    }


    async login(req: Req, res: Res) {
        try {
          const result = await this.userUseCase.login(req.body);
          res.status(200).json(result?.user);
        } catch (error: any) {
         console.log(error.message);
        }
      }

}