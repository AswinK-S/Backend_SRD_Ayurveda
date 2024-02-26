import userModel from "../../../database/mongo/models/userModel";

import { UserRepository } from "../../../database/mongo/repository/userRepository";
import { UserUseCase } from "../../../../useCase/useCases/userUseCase";
import { UserController } from "../../../../controllers/userController";
import { GenerateOtp } from "../../../services/generateOtp";
import { SendMail } from "../../../services/sendMail";

const userRepository = new UserRepository(userModel)
const generateOtp = new GenerateOtp()
const sendMail = new SendMail()

const userUseCase = new UserUseCase(
    userRepository,
    generateOtp,
    sendMail,

)


const userController = new UserController(userUseCase)

export {userController}
