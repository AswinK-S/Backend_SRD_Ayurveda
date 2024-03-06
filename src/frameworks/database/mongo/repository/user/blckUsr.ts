
import userModel from "../../models/userModel";

export const blckUsrRepo = async(id:string):Promise<string>=>{
    try {
        const userData = await userModel.findById({ _id:id })
        let result : string =''
        if (userData) {
            if (userData.status === true) {
                await userModel.findByIdAndUpdate({ _id: id }, { $set: { status: false } })
                result ='User blocked successfully'

            } else {
                await userModel.findByIdAndUpdate({ _id: id}, { $set: { status: true } })
                result ='User unblocked successfully'
            }
        }
        return result
    } catch (error:any) {
        console.log('error frm blck usrRepo',error.message);
        throw(error)
    }
}