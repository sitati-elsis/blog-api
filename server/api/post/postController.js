let Post = require('./postModel');
let _ = require('lodash');

exports.params = function(req,res,next,id){
    Post.findById(id)
        .populate('author', 'username')
        .exec()
        .then(function(post){
            if(!post){
                next(new Error('No Post with that id'));
            }
            else {
                req.post = post;
                next();
            }
        }, function(err){
                next(err);
            
        });
};

exports.get = function(req, res, next){
    Post.find({})
        .populate('author categories')
        .exec()
        .then(function(posts){
            res.json(posts);
        }, function(err){
            next(err);
        });
};

exports.getOne = function(req, res, next){
    let post = req.post;
    res.json(post);
};

exports.put = function(req, res, next){
    let post = req.user;
    let update = req.body;

    _.merge(post, update);
    post.save(function(err, saved){
        if(err){
            next(err);
        } else {
            res.json(saved);
        }
    });
};

exports.post = function(req, res, next){
    let newPost = req.body;
    Post.create(newPost)
        .then(function(post){
            res.json(post);
        }, function(err){
            next(err);
        });
};

exports.delete = function(req, res, next) {
    req.post.remove(function(err, removed){
        if(err){
            next(err);
        }
        else{
            res.json(removed);
        }
    });
};
