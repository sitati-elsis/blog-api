let User = require('./userModel');
let _ = require('lodash');
let signToken = require('../auth/auth').signToken;

exports.params = function(req,res,next,id){
    User.findById(id)
        .select('-password')
        .exec()
        .then(function(user){
            if(!user){
                next(new Error('No user with that id'));
            }
            else {
                req.user = user;
                next();
            }
        }, function(err){
                next(err);
            
        });
};

exports.get = function(req, res, next){
    User.find({})
        .then(function(user){
            res.json(user);
        }, function(err){
            next(err);
        });
};

exports.getOne = function(req, res, next){
    let user = req.user;
    res.json(user);

};

exports.put = function(req, res, next){
    let user = req.user;
    let update = req.body;

    _.merge(user, update);
    user.save(function(err, saved){
        if(err){
            next(err);
        } else {
            res.json(saved);
        }
    });
};

exports.post = function(req, res, next){
    let newUser = new User(req.body);
    
    newUser.save(function(err, user){
        if(err){
            return next(err);
        }
        let token  = signToken(user._id);
        res.json({token: token});
    });
};

exports.delete = function(req, res, next) {
    req.user.remove(function(err, removed){
        if(err){
            next(err);
        }
        else{
            res.json(removed);
        }
    });
};

exports.me = function(req, res, next){
    res.json(req.user.toJson());
};