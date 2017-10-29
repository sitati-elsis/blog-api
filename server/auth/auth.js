// here is where we will do all of our json web token stuff
// put everything related to authentication here


let jwt = require('jsonwebtoken');
let expressJWT = require('express-jwt');
let config = require('../config/config');
let checkTocken = expressJWT({secret: config.secrets.jwt});
let User = require('../api/user/userModel');



exports.decodeToken = function(){
    return function(req, res, next){
        if(req.query && req.query.hasOwnProperty('access_token')){
            req.headers.authorization = 'Bearer ' + req.query.access_token;
        }
        // this will call next if token is valid and if token has 
        // an error it will call next with an error
        // if the decoding is succesful it will grab whatever whatever object
        // it has decoded and attach it to req.user
        checkTocken(req, res, next);
    };
};


exports.getFreshUser =function(){
    return function(req, res, next){
        User.findById(req.user._id)
            .then(function(user){
                if(!user){
                    res.status(401).send('Unauthorised');
                }
                else{
                    req.user = user;
                    next();
                }
            }, function(err){
                next(err);
            });
    };
};
//verify User has nothing to do with JWT we are checking to see if the
// password provided is the same as the password given at singup
exports.verifyUser = function(){
    return function(req, res, next){
        let username = req.body.username;
        let password = req.body.password;
        
        //when there is no username or password
        if(!username || !password){
            return res.status(400).send('You need a username and password!');
        }
        //look user up in the DB so that we can check if 
        //passwords match for the username
        User.findOne({username: username})
            .then(function(user){
                if(!user){
                    res.status(401).send('No user with the given username');
                }
                //a user has been found
                else{
                    //checking the password here
                    if(!user.authenticate(password)){
                        res.status(401).send('Wrong Password');
                    }
                    else{
                        //everything matches
                        req.user = user;
                        next();
                    }
                }
            }, function(err){
                next(err);
            });
    };
};
exports.signToken = function(id){
    return jwt.sign(
        {_id: id},
        config.secrets.jwt,
        {expiresInMinutes: config.expireTime}
    );
};