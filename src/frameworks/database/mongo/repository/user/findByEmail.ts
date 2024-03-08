            import userModel from "../../models/userModel";


            export const findUserByEmail = async (email:string,userModels:typeof userModel) =>{

                const existingUser = await userModels.findOne({email}).select("+password")
                console.log('existing user form userModels  :',existingUser);
                return existingUser
            }

