var mongoose= require('mongoose');
const newbills=mongoose.Schema({
  
  RoomId:{
    type:String,
    require:true
  },
  BillName:{
    type:String,
    require:true
  },
  BillCost:{
    type:String,
    require:true
  },
  PaidBy:{
    type:JSON,
    require:true
  },
  SplitAmong:{
    type:Array,
    require:true
  },
  BillUpdatedBy:{
    type:JSON,
    require:true
  },
  BillsPaidMembers:{
    type:Array,
    require:true
  }
});
const newbill=module.exports=mongoose.model('bills', newbills);