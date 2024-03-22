import { IUserRepository } from "../../interface/repositoryIntrfce/userRepoIntfc";
import { Iuser } from "../../../entity/userEntity";
import { IHashPassword } from "../../interface/services/hashPassword";
import { IToken } from "../../interface/services/jwt.types";
import { IJwt } from "../../interface/services/jwt.types";
import { Next } from "../../../frameworks/types/serverPackageTypes";
import ErrorHandler from "../../middleware/errorHandler";

export const login = async (
    userRepository: IUserRepository,
    bcrypt: IHashPassword,
    token: IJwt,
    email: string,
    password: string,
    next: Next,
): Promise<{ user: Iuser; tokens: IToken; } | void> => {
    try {
        const user = await userRepository.findUsersByEmail(email)

        if (!user) return next(new ErrorHandler(400, 'invalid email id'))

        const hashedPassword = user.password
        const result = await bcrypt.comparePassword(password, hashedPassword)
        console.log('passwrd cmpr :', result);
        if (!result) return next(new ErrorHandler(400, 'Invalid Password'))

        if (user.status && result) {
            user.password = ''
            const role = 'user'
            const tokens = await token.createAccessAndRefreshToken(user?._id as string, role as string)
            return {
                user,
                tokens,
            }

        }else{
            return next(new ErrorHandler(403, "user don't have access"))
        }


    } catch (error: any) {
        console.log(error.message);
    }
}