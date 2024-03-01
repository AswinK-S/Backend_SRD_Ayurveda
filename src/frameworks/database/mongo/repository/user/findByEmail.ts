            import userModel from "../../models/userModel";


            export const    findUserByEmail = async (email:String,userModels:typeof userModel) =>{

                const existingUser = await userModels.findOne({email})
                console.log('existing user form userModes  :',existingUser);
                return existingUser
            }

