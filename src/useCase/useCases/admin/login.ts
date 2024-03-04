import { Iadmin } from "../../../@types/entity/adminEntity"
import { IadminJwt } from "../../interface/services/jwt.types"
import { IToken } from "../../interface/services/jwt.types"
import { IadminRepository } from "../../interface/repository/adminRepository"
import { IHashPassword } from "../../interface/services/hashPassword"
import { Next } from "../../../frameworks/types/serverPackageTypes"
import ErrorHandler from "../../middleware/errorHandler"

export const adlogin = async (
    adminRepository: IadminRepository,
    bcrypt: IHashPassword,
    token: IadminJwt,
    email: string,
    password: string,
    next: Next
): Promise<{ admin: Iadmin; tokens: IToken; } | void> => {

    try {
        let admin = await adminRepository.findAdminByEmail(email)
        console.log('admin :>>', admin);

        if (!admin) return next(new ErrorHandler(400, 'invalid email id'))

        const hashedPassword = admin.password
        const matchedPsswrd = await bcrypt.comparePassword(password, hashedPassword)
        if (!matchedPsswrd)next(new ErrorHandler(400, 'invalid password'))

        admin.password = ''
        const role='admin'
        const tokens = await token.createAccessAndRefreshToken(admin?._id as string,role as string)
        console.log('admin, tokens :  from admn login', admin, tokens);
        
        return {
            admin,
            tokens,
        }


    } catch (error: any) {
        console.log('admn lgn err ', error.message);
    }
}   