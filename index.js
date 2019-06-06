
//importing modules
var express = require('express'); 
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var app = express();

//adding middleware
app.use(cors());
//body-parser
app.use(bodyparser.json());

 
const route=require('./route/routes');
app.use('/api',route);

//connector to mongodb
mongoose.connect('mongodb://localhost:27017/baba10');

//on connection
mongoose.connection.on('connected',()=>{
    console.log("mongo db connected at port 27017");
})

//on connection error
mongoose.connection.on('error',(err)=>{
    console.log(err);
})

//declaring the port number
const PORT = 3000;

app.get('/',(req,res)=>{
    res.send("working");
})



app.listen(PORT,()=>{
    console.log("Server has been started at post: "+PORT);
})