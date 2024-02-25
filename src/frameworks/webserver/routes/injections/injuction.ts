import userModel from "../../../database/mongo/models/userModel";

import { UserRepository } from "../../../database/mongo/repository/userRepository";
import { UserUseCase } from "../../../../useCase/useCases/userUseCase";
import { UserController } from "../../../../controllers/userController";


const userRepository = new UserRepository(userModel)

const userUseCase = new UserUseCase(
    userRepository
)


const userController = new UserController(userUseCase)

export {userController}