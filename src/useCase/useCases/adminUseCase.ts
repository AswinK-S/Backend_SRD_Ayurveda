import { IadminUseCase } from "../interface/useCase/adminUseCase";
import { IadminRepository } from "../interface/repository/adminRepository";
import { IHashPassword } from "../interface/services/hashPassword";
import { IadminJwt,IToken } from "../interface/services/jwt.types";
import { Iadmin } from "../../entity/adminEntity";
import { Next } from "../../frameworks/types/serverPackageTypes";
import { catchError } from "../middleware/catchError";
import { adlogin } from "./admin/login";




export class AdminUseCase implements IadminUseCase{

    private adminRepository:IadminRepository;
    private bcrypt:IHashPassword;
    private jwtToken:IadminJwt;

    constructor(
        adminRepository:IadminRepository,
        bcrypt:IHashPassword,
        jwtToken:IadminJwt
    ){
        this.adminRepository =adminRepository;
        this.bcrypt = bcrypt;
        this.jwtToken = jwtToken
    }

    //login
    async adlogin({ email, password }: { email: string; password: string; }, next:Next): Promise< { admin: Iadmin; tokens: IToken; } | void > {
        try{
        return await adlogin(
            this.adminRepository,
            this.bcrypt,
            this.jwtToken,
            email,
            password,
            next    
        )
        }catch(error:unknown){
            catchError(error,next)
        }
    }

}