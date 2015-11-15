var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var signedCookieParser = cookieParser('zfpxchat');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
var sessionStore = new MongoStore({
    url:"mongodb://123.57.143.189/zfpxchat"
})
var PORT = process.env.PORT  | 3000;
app.use(express.static(path.join(__dirname,'build')));
app.use(bodyParser.json());
app.use(cookieParser());// req.cookies
//  "_id" : "Q9TD4XauF_Q-AZQTy28NViunzjUy5KSL",
//"session" : "{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"username\":\"张三\",\"password\":\"e10adc3949ba59abbe56e057f20f883e\",\"email\":\"zhang_renyang@126.com\",\"avatar\":\"https://secure.gravatar.com/avatar/50d11d6a57cfd40e0878c8ac307f3e01?s=48\",\"_id\":\"56480d8c618d640407007b75\",\"__v\":0}}",
// "expires" : ISODate("2015-11-29T07:42:42.869Z")
//Cookie:connect.sid=s%3AQ9TD4XauF_Q-AZQTy28NViunzjUy5KSL.T7VRXnueSEB0nG%2F02NyMzJM1EnsaZxT0UUwiIxM6V1k
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
io.set('authorization',function(request,next){
    signedCookieParser(request,{},function(err){
        sessionStore.get(request.signedCookies['connect.sid'],function(err,session){
            if(err){
                next(err);
            }{
                if(session && session.user){
                    request.session = session;
                    next(null,true);
                }else{
                    next('未登陆');
                }
            }
        });
    });
});

var  SYSTEM = {
    name:"珠峰", avatar:""
}

var messages = [];
var users = [];
io.sockets.on('connection',function(socket){
    var user = socket.request.session.user;
    users.push(user);
    socket.broadcast.emit('message.add',{
        content:user.username+'进入了聊天室',
        creator:SYSTEM,
        createAt:new Date()
    });
    socket.on('disconnect',function(){
        users.splice(users.indexOf(user),1);
        socket.broadcast.emit('message.add',{
            content:user.username+'退出了聊天室',
            creator:SYSTEM,
            createAt:new Date()
        });
    });
    socket.emit('connected');
    socket.on('getAllMessages',function(){
        socket.emit('allMessages',{messages:messages,users:users});
    });
    socket.on('createMessage',function(message){
        messages.push(message);
        io.emit('message.add',message);
    });
});
