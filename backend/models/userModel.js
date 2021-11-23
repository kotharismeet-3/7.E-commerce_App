const mongoose = require('mongoose');
//console.log('User Schema created!');

const userSchema = mongoose.Schema({
    googleId : {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: String,
        required: true,
        default: false
    }
}, {
    timestamps: true
});

const User = mongoose.model('User',userSchema);

module.exports = User;