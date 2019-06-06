var mongoose= require('mongoose');
const bills=mongoose.Schema({
  
  RoomName:{
    type:String,
    require:true
  },
 
  CreatedByID:{ 
    type:String,
    require:true
  },
   UpdatedBy:{ 
    type:JSON,
    require:true
  },
  Members:{
    type:Array,
    require:true
  }
  
});

const billroom=module.exports=mongoose.model('billroom', bills);