import userModel from "../../models/userModel";


const findUserByEmail=async (email:String,userModels:typeof userModel) =>{

    const existingUser = await userModels.findOne({email})
    console.log('existing user form userModes  :',existingUser);
    return existingUser
}

export default findUserByEmail