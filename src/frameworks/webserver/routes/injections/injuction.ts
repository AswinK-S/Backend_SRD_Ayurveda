import userModel from "../../../database/mongo/models/userModel";
import { UserRepository } from "../../../database/mongo/repository/userRepository";
import { UserUseCase } from "../../../../useCase/useCases/userUseCase";
import { UserController } from "../../../../controllers/userController";
import { GenerateOtp } from "../../../services/generateOtp";
import { SendMail } from "../../../services/sendMail";
import { OtpRepository } from "../../../database/mongo/repository/otp.repository";
import { JWTtoken } from "../../../services/jwt";
import { Encrypted } from "../../../services/hshPswrdCls";



const userRepository = new UserRepository(userModel)
const generateOtp = new GenerateOtp()
const sendMail = new SendMail()
const otpRepository = new OtpRepository()
const bcryptService = new Encrypted()
const jwtToken = new JWTtoken()

const userUseCase = new UserUseCase(
    userRepository,
    generateOtp,
    sendMail,
    otpRepository,
    jwtToken,
    bcryptService,

)


const userController = new UserController(userUseCase)

export {userController}
