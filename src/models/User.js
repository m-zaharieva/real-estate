const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Full name is required!'],
        validate: [/^[A-Z][a-z]+ [A-Z][a-z]+$/, 'Name should be in the following format "Firstname Lastname"!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minlength: [5, 'Username should be at least 5 characters long'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: [4, 'Password should be at least 4 characters long!'], 
    }
});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

const User = mongoose.model('User', userSchema);

module.exports = User;