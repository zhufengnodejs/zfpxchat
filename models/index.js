var mongoose = require('mongoose');
mongoose.connect("mongodb://123.57.143.189/zfpxchat");
var Schema = mongoose.Schema;
exports.User = mongoose.model('User',new Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
}))