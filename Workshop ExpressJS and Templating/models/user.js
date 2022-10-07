const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    'username': {
        type: String,
        unique: true,
        required: true,
        validate: [/^[A-Za-z0-9]+$/, 'Username should consist only of English letters and digits!'],
        minlength: [5, 'Should consist minimum 5 characters!']
    },
    'password': {
        type: String,
        validate: [/^[A-Za-z0-9]+$/, 'Password should consist only of English letters and digits!'],
        required: true,
        minlength: [5, 'Should consist minimum 8 characters!']
    }
})

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
    .then((hash) =>{
         this.password = hash
         next()
    })
})

const User = new mongoose.model('User', userSchema)
module.exports = User;