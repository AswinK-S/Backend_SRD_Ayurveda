import userModel from "../../../database/mongo/models/userModel";
import { UserRepository } from "../../../database/mongo/repository/userRepository";
import { UserUseCase } from "../../../../useCase/useCases/userUseCase";
import { UserController } from "../../../../controllers/userController";
import { GenerateOtp } from "../../../services/generateOtp";
import { SendMail } from "../../../services/sendMail";
import { OtpRepository } from "../../../database/mongo/repository/otp.repository";
import { JWTtoken } from "../../../services/jwt";
import { Encrypted } from "../../../services/hshPswrdCls";
import { Cloudinary } from "../../../utils/cloudinaryRepo";
//treatment
import { TreatmentRepository } from "../../../database/mongo/repository/treatmentRepo";
import treatmentModel from "../../../database/mongo/models/treatmentModel";
//doctor
import doctorModel from "../../../database/mongo/models/doctorModel";
import { DoctorRepository } from "../../../database/mongo/repository/doctorRepository";
import { DoctorController } from "../../../../controllers/doctorController";
import { DoctorUseCase } from "../../../../useCase/useCases/doctorUseCase";


//admin 
import adminModel from "../../../database/mongo/models/adminModel";
import { AdminController } from "../../../../controllers/adminController";
import { AdminRepository } from "../../../database/mongo/repository/adminRepository";
import { AdminUseCase } from "../../../../useCase/useCases/adminUseCase";

const cloudinary = new Cloudinary()

//user
const userRepository = new UserRepository(userModel)
const generateOtp = new GenerateOtp()
const sendMail = new SendMail()
const otpRepository = new OtpRepository()
const bcryptService = new Encrypted()
const jwtToken = new JWTtoken()
const doctorRepository = new DoctorRepository(doctorModel)


//admin
const adminRepository = new AdminRepository(adminModel,userModel,doctorModel,treatmentModel)

// treatment 
const treatmetnRepository = new TreatmentRepository()

const userUseCase = new UserUseCase(
    userRepository,
    generateOtp,
    sendMail,
    otpRepository,
    jwtToken,
    bcryptService,

)


const adminUseCase = new AdminUseCase(
    adminRepository,
    bcryptService,
    jwtToken,
    treatmetnRepository,
    doctorRepository,
    userRepository,
    sendMail
)

const doctorUseCase = new DoctorUseCase(
    doctorRepository,
    bcryptService,
    jwtToken,
    cloudinary
    )

const userController = new UserController(userUseCase,adminUseCase)
const adminController = new AdminController(adminUseCase)
const doctorController = new DoctorController(doctorUseCase)

export {userController,adminController,doctorController}
