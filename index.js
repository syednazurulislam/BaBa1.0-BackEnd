
//importing modules
var express = require('express'); 
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var app = express();
var server=require('http').createServer(app);
var socketio=require('socket.io');
var io=socketio().listen(server);

// // socket connection
// io.on("connection",function(socket){
//     console.log ("a connection has been made by socket"+socket.id);
//     socket.on("disconnect",function(){
//         console.log("the user has disconnected");
    
//     })
//     socket.on("Message",function(data){
//         console.log(data.message)
//         io.emit("Message",data);
//     })
// })


//sockets name-space
io.of("/bingo").on("connection",(socket)=>{
    console.log("new user")
// socket.emit("Message","helloworld");
socket.on("GameData",function(data){
    console.log(data)
var roomid=data.roomid;
var message=data.message
    socket.join(roomid);
    socket.broadcast.to(roomid).emit("GameData",message);
     
    
 
})
})














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


server.listen(PORT,()=>{
    console.log("Server has been started at post: "+PORT);
})