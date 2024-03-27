import mongoose,{ Model, Schema } from "mongoose";
import { ISlot } from "../../../../entity/slotEntity";

const SlotSchema:Schema<ISlot> =new mongoose.Schema({
    doctorId:{
        type:Schema.Types.ObjectId,
        ref:'Doctor',
        required:true
    },
    startTime:{
        type:Date,
        required:true
    },
    endTime:{
        type:Date,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    count:{
        type:Number,
        default:18
    }
})


SlotSchema.virtual('timePart').get(function(this:ISlot):string{
    const startHour = this.startTime.getHours()
    if(startHour>=9 && startHour<12){
        return    'Morning '  
    }
    else if(startHour>=12 && startHour<17 ){
        return 'Afternoon'
    }else {
        return 'Unknown';
      }
});

const slotModel:Model<ISlot> = mongoose.model('Slot',SlotSchema) 
export default slotModel 