import { IDoctor } from "../../../../@types/entity/doctorEntity";
import { IDoctorRepository } from "../../../../useCase/interface/repository/doctorRepo";
import {
    addDoctorRepo,
    isDoctorExist
} from './doctor/index'
export class DoctorRepository implements IDoctorRepository{

    //add new doctor
    async addDoctor({name, email, mob, password, address, experience, doctor_id, treatments }: IDoctor): Promise<IDoctor> {
        try{
            console.log('addDoctor repository in frmwrk -----');

            return  await addDoctorRepo({name, email, mob, password, address, experience, doctor_id, treatments })
        }catch(err:any){
            console.log('err from clss dctrRepo addDoctr',err.message);
            throw (err)
        }
    }


    //check if the doctor already exists in the database
    async isDoctorExist(email: string):Promise<IDoctor|string > {
        try{
            return await isDoctorExist(email)
        }catch(err:any){

            console.log('err from clss dctr repo isDoctor');
            throw (err)
        }

    }
}