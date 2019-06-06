//importing schema
const createroom = require('../mongoSchema/spiltBillRecords');
const registerusers = require('../mongoSchema/userdetails');
const bill = require('../mongoSchema/newbill');


function userregister(req, res, next){
    console.log("in post method userregister");
        console.log(req.body);
                //by using the mongoose save methode we are saving the data into mongo-db
               let newuserdetails= new registerusers({
                   UserName:req.body.name,
                   Email:req.body.email,
                   UserId:req.body.id
               })
               registerusers.findOne({ UserId: req.body.id }, function (err, user) {
                if (err) {
                    res.json(err);
                } else if(user == null){
                  
                newuserdetails.save((err, newuserdetails) => {
                    if (err) {
                        res.json(err);
                    } else {
                        console.log("userdetails has added to the database");
                        res.json("loginsuccessful");
                    }
                });
            }else if(user != null){
                res.json("loginsuccessful");
            }
            }) 
         }



function createbillroom(req, res, next){
console.log(req.body.roomname);
    let newsplitbillroom= new createroom({
        RoomName:req.body.roomname,
        CreatedByID:req.body.createdbyid,
        Members:req.body.members
    })
    console.log(newsplitbillroom);
    newsplitbillroom.save((err, newsplitbillroom) => {
        if (err) {
            res.json(err);
        } else {
            console.log("room has created successfully");
            res.json("createdsucessfully");
        }
    });
}


function findmySplitboards(req, res, next){
    console.log(req.body.UserId);
    createroom.find({ "Members.UserId": {$in:[req.body.UserId]} },{RoomName:1,_id:1} , function (err, result) {
console.log(result);
res.json(result);
    });
}

function finduserlike(req, res, next){
    var input=req.body.query;
    registerusers.find({Email:{'$regex': input}},{UserName:1,UserId:1,_id:0},function(err,userdetails){
        if(err){
            console.log(err)
            res.json(err);
        }else{
            console.log(userdetails);
            res.json(userdetails);
        }
     })
    }
  function findroommembers(req,res,next){
    console.log("im in findroommembers"+req.body.roomid);
      createroom.find({_id:req.body.roomid},{Members:1,_id:0},function(err,roommembers){
          if(err){
            console.log(err)
            res.json(err);
          }else{
            console.log(roommembers);
            res.json(roommembers);
          }
      })
  }



  function newbill(req,res,next){
    console.log("im in new bills");
    let newbill= new bill({
        RoomId:req.body.roomid,
        BillName:req.body.billname,
        BillCost:req.body.billcost,
        PaidBy:req.body.paidby,
        SplitAmong:req.body.splitamong
    })
    console.log(newbill);
    newbill.save((err, newbill) => {
        if (err) {
            res.json(err);
        } else {
            console.log("bill created successfully");
            res.json("createdsucessfully");
        }
    });
  }




   function updatebill(req,res,next){
    console.log("im in new updatebill");
    console.log(req.body);
    var billid=req.body.billid;
    let updatebill= new bill({
        RoomId:req.body.roomid,
        BillName:req.body.billname,
        BillCost:req.body.billcost,
        PaidBy:req.body.paidby,
        SplitAmong:req.body.splitamong,
        BillUpdatedBy:req.body.billupdated

    })
    var update={
      RoomId:req.body.roomid,
      BillName:req.body.billname,
      BillCost:req.body.billcost,
      PaidBy:req.body.paidby,
      SplitAmong:req.body.splitamong,
      BillUpdatedBy:req.body.billupdated

  }
    console.log(updatebill);
     bill.updateOne({_id:billid}, {$set:update}).then(ress=>{
                 console.log("bill updated successfully");
                
            res.json("UpdatedSuccessfully");
     })

   }


  exports.getbills= function (req,res,next){
    console.log("im in findroombilldetails"+req.body.roomid);
    bill.find({RoomId:req.body.roomid},function(err,billsandroommembers){
        if(err){
          console.log(err)
          res.json(err);
        }else{
          console.log(billsandroommembers);
          res.json(billsandroommembers);
        }
    })
  }


  exports.getbillsnames= function (req,res,next){
    console.log("im in findroombills"+req.body.roomid);
    bill.find({RoomId:req.body.roomid},{BillName:1,_id:1},function(err,billsandroommembers){
        if(err){
          console.log(err)
          res.json(err);
        }else{
          console.log(billsandroommembers);
          res.json(billsandroommembers);
        }
    })
  }


  exports.getbill= function (req,res,next){
    console.log("im in findroombilldetail"+req.body.billid);
    bill.find({_id:req.body.billid},function(err,billsandroommembers){
        if(err){
          console.log(err)
          res.json(err);
        }else{
          console.log(billsandroommembers);
          res.json(billsandroommembers);
        }
    })
  }
  
  exports.getbillsofperson= function (req,res,next){
    console.log("im in findroombilldetail"+JSON.stringify(req.body));
    bill.find( {"RoomId":req.body.RoomId,"PaidBy.userid":{$in:[req.body.paidby]},"SplitAmong.userid": {$in:[req.body.UserId]} },function(err,selecteduserclaimsbills){
        if(err){
          console.log(err)
          res.json(err);
        }else{
          console.log("this is from selecteduserclaimsbills"+selecteduserclaimsbills);
          res.json(selecteduserclaimsbills);
        }
    })
  }



  exports.updatebillroom=function(req,res,next){

    var update={
      RoomName:req.body.roomname,
      Members:req.body.members,
      UpdatedBy:req.body.updatedby,

  }
    createroom.updateOne({_id:req.body.roomid}, {$set:update}).then(ress=>{
      console.log("bill updated successfully"+JSON.stringify(ress));
     
 res.json("UpdatedSuccessfully");
})
  }



exports.UpdatePaidInBill=function(req,res,next){
  console.log("UpdatePaidInBill");
  console.log(req.body.billid,"/",req.body.updatepaidmembers);
myquery={_id:req.body.billid};
update= req.body.updatepaidmembers;

  bill.updateOne(myquery, {$push:{BillsPaidMembers:update}}).then(ress=>{
    console.log("bill updated successfully");
   
res.json("UpdatedSuccessfully");
})
}


  function roomdetails(req,res,next){
    console.log("im in roomdetails"+req.body.roomid);
      createroom.find({_id:req.body.roomid},function(err,roommembers){
          if(err){
            console.log(err)
            res.json(err);
          }else{
            console.log(roommembers);
            res.json(roommembers);
          }
      })
  }

 exports.deletebillroom=function(req,res,next){
console.log("deletebillroom");
console.log(req.body.roomid)
bill.deleteMany({RoomId:req.body.roomid}).then(ress1=>{
  console.log("bills of room deleted successfully"+JSON.stringify(ress1));
  createroom.deleteOne({_id:req.body.roomid}).then(ress=>{
    console.log("billroom deleted successfully"+JSON.stringify(ress));
   
  res.json("deletedSuccessfully");
  })


})

 }
exports.deletebill=function(req,res,next){
  console.log("deletebill");
  console.log(req.body.billid);
  bill.deleteOne({_id:req.body.billid}).then(ress=>{
    console.log("bill deleted successfully"+JSON.stringify(ress));
   
res.json("deletedSuccessfully");
})
}
module.exports.roomdetails=roomdetails;
module.exports.findroommembers=findroommembers;
module.exports.finduserlike=finduserlike;
module.exports.findmySplitboards=findmySplitboards;
module.exports.userregister = userregister;
module.exports.createbillroom = createbillroom;
module.exports.newbill = newbill;
module.exports.updatebill = updatebill;


