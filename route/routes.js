var express = require('express');
const assert = require('assert');
var jwt = require('jsonwebtoken');
var route = express.Router();
var state = {};

//passportService = require('../config/passport');
passport = require('passport');
var requireAuth = passport.authenticate('jwt', { session: false }),
requireLogin = passport.authenticate('local', { session: false });
//importing schema
const details = require('../model/mongoSchema/productdetails');
const registerusers = require('../model/mongoSchema/userdetails');

//importing token.js page
const tokenpage = require('../model/token');
//importing the mongo functions
const MongoDB = require('../model/functions/mongofunction');
 

route.post('/userregister',MongoDB.userregister);
route.post('/createbillroom',MongoDB.createbillroom);
route.post('/findmySplitboards',MongoDB.findmySplitboards);
route.post('/finduserlike',MongoDB.finduserlike);
route.post('/roommembers',MongoDB.findroommembers);
route.post('/newbill',MongoDB.newbill);
route.post('/getbills',MongoDB.getbills);
route.post('/getbillsnames',MongoDB.getbillsnames);
route.post('/getbill',MongoDB.getbill);
route.post('/getbillsofperson',MongoDB.getbillsofperson);
 route.post('/updatebill',MongoDB.updatebill);
route.post('/roomdetails',MongoDB.roomdetails);
route.post('/updatebillroom',MongoDB.updatebillroom);
route.post('/UpdatePaidInBill',MongoDB.UpdatePaidInBill);
route.post('/deletebillroom',MongoDB.deletebillroom);
route.post('/deletebill',MongoDB.deletebill);
route.post('/createbingoboard',MongoDB.createbingoboard);
route.post('/listbingowaitingboards',MongoDB.listbingowaitingboards);
route.post('/updatebingoboard',MongoDB.updatebingoboard);



module.exports = route;


