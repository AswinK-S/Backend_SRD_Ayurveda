import adminModel from "../../models/adminModel";

export const findAdminByEmail = async (email:string,adminModels:typeof adminModel)=>{
    let adminData = await adminModels.findOne({email})
    console.log('admin login data:',adminData);
    return adminData
}