var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
var sessionStore = new MongoStore({
    url:"mongodb://123.57.143.189/zfpxchat"
})
var PORT = process.env.PORT  | 3000;
app.use(express.static(path.join(__dirname,'app')));
app.use(bodyParser.json());
app.use(cookieParser());// req.cookies
app.use(expressSession({
    secret:'zfpxchat',
    resave:true,
    saveUninitialized:true,
    store:sessionStore
}));
var index = require('./routes/index');
var users = require('./routes/users');
app.use('/',index);
app.use('/users',users);
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
