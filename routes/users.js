var express = require('express');
var router = express.Router();
var path = require('path');
var crypto = require('crypto');
var User = require('../controllers/user');
router.get('/validate',function(req,res){
  var user = req.session.user;
  if(user){
    res.json(user);
  }else{
      res.status(500).json({msg:"error"});
  }
});


router.post('/reg', function (req, res) {
    var md5Email = md5(req.body.email);
    var avatar = "https://secure.gravatar.com/avatar/" + md5Email + "?s=48";
    User.reg({
        username: req.body.username,
        password: md5(req.body.password),
        email: req.body.email,
        avatar: avatar
    }, function (err,user) {
        if(err){
            res.json(500,{msg:err});
        }else{
            req.session.user = user;
            res.json(user);
        }
    });
});

router.post('/login', function (req, res) {
    req.body.password = md5(req.body.password);
    User.login(req.body,function(err,user){
        if(err){
            res.json(500,{msg:err});
        }else{
            req.session.user = user;
            res.json(user);
        }
    });
});


router.get('/logout',function(req,res){
    req.session.user = null;
    res.json(200,{msg:'success'});
});

function md5(content) {
    return crypto.createHash('md5').update(content).digest('hex');
}
module.exports = router;