import doctorModel from "../../models/doctorModel";

export const findDoctorByEmail = async(email:string,doctorModels:typeof doctorModel)=>{
    try{
        let result = await doctorModels.findOne({email}).select("+password")
        console.log('find doctor--',result);
        return result
    }catch(err:any){
        console.log('db err--',err.message);
        throw (err)
    }
}