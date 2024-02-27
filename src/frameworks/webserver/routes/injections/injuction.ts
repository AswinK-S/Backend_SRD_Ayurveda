import userModel from "../../../database/mongo/models/userModel";

import { UserRepository } from "../../../database/mongo/repository/userRepository";
import { UserUseCase } from "../../../../useCase/useCases/userUseCase";
import { UserController } from "../../../../controllers/userController";
import { GenerateOtp } from "../../../services/generateOtp";
import { SendMail } from "../../../services/sendMail";
import { OtpRepository } from "../../../database/mongo/repository/otp.repository";

const userRepository = new UserRepository(userModel)
const generateOtp = new GenerateOtp()
const sendMail = new SendMail()
const otpRepository = new OtpRepository()

const userUseCase = new UserUseCase(
    userRepository,
    generateOtp,
    sendMail,
    otpRepository

)


const userController = new UserController(userUseCase)

export {userController}
