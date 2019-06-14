var mongoose= require('mongoose');
const newbingogame=mongoose.Schema({
  PlayerOneBoard:{
    type:JSON,
    require:true
  },
  PlayerOneDetails:{
    type:JSON,
    require:true
  },
  PlayerTwoBoard:{
    type:JSON,
    require:true
  },
  PlayerTwoDetails:{
    type:JSON,
    require:true
  },
  BetCost:{
    type:String,
    require:true
  },
  GameWinner:{
    type:JSON,
    require:true
  }
});

const bingoboard=module.exports=mongoose.model('BingoGameRoom', newbingogame);