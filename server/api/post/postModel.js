let mongoose = require('mongoose');
var PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique:true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    categories: [{type: mongoose.Schema.Types.ObjectId, ref:'category'}]
});

let PostModel = mongoose.model('post', PostSchema);
module.exports = PostModel;