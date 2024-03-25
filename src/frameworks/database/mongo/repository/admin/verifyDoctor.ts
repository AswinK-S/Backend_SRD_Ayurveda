import doctorModel from "../../models/doctorModel";

export const verifydoctor = async(id:string,doctorModels:typeof doctorModel)=>{
    try {
        const result = await doctorModels.findById({_id:id})
        let verify:boolean=false
        if(result?.isVerified){
            verify=false
        }else{
            verify=true
        }
        const verifyDoc = await doctorModels.findByIdAndUpdate({_id:id},{$set:{isVerified:verify}},{new:true})
        if(verifyDoc)verifyDoc.password=''
        return verifyDoc
    } catch (error:any) {
        throw (error)
    }
}