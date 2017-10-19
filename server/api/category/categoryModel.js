let mongoose = require('mongoose');

let CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
});

let CategoryModel = mongoose.model('category', CategorySchema);
module.exports = CategoryModel;