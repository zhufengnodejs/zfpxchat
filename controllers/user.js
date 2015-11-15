var db = require('../models');

exports.reg = function(user,callback){
    new db.User(user).save(callback);
}

exports.login = function(user,callback){
    db.User.findOne({
        username:user.username,
        password:user.password
    },callback);
}