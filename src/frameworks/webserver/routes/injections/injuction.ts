import userModel from "../../../database/mongo/models/userModel";

import { UserRepository } from "../../../database/mongo/repository/userRepository";

const userRepository = new UserRepository(userModel)

