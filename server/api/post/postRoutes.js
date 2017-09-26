let router = require('express').Router();

router.route('/')
    .get(function(req, res){
        console.log("Hey how you doing")
        res.send("This is how we rock")
    })

module.exports = router;