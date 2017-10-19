let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
});

let UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;