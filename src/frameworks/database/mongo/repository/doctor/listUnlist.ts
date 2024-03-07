import doctorModel from "../../models/doctorModel"

export const lstUnlstDoc = async (id:string):Promise<string>=>{
    try{
        console.log('id from ddd repooo---',id);
        let docData = await doctorModel.findById({_id:id})
        console.log('docData ',docData?.status);
        let result:string=''

        if(docData?.status ===true){
            await doctorModel.findByIdAndUpdate({_id:id}, {$set:{status:false}})
            
            result = 'Doctor has been unlisted'
        }else{
            await doctorModel.findByIdAndUpdate({_id:id},{$set:{status:true}})
            result ='Doctor has been listed'
        }
        console.log('result after doing db oprtins --',result);
        return result
    }catch(err:any){
        throw (err)
    }
}