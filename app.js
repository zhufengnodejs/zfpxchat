var express = require('express');
var path = require('path');
var app = express();

var PORT = process.env.PORT  | 3000;
app.use(express.static(path.join(__dirname,'app')));
app.use(function(req,res){
    res.sendFile(path.join(__dirname,'app','index.html'));
});
var server = app.listen(PORT);// 建立http服务器
var io = require('socket.io').listen(server);
var messages = ['test'];
io.sockets.on('connection',function(socket){
    socket.emit('connected');
    socket.on('getAllMessages',function(){
        socket.emit('allMessages',messages);
    });
    socket.on('createMessage',function(message){
        messages.push(message);
        io.emit('message.add',message);
    });
});
