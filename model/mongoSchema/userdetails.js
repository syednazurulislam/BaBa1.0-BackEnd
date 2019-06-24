var mongoose= require('mongoose');
const userdetailsschema=mongoose.Schema({
  
  UserName:{
    type:String,

    
    require:true
  },

  Email:{
    type:String,
    require:true
  },
  UserId:{


    type:String,
    require:true
  }
  
});

const registerusers=module.exports=mongoose.model('registerusers', userdetailsschema);