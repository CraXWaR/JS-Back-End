const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [5, 'Should consist at least 5 characters!'],
        validate: [/^[A-Za-z0-9\s]+$/, 'Name should consist only of English letters, digits and whitespaces!'],
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
        validate: [/^[A-Za-z0-9\s]+$/, 'Description should consist only of English letters, digits and whitespaces!'],
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^https*/.test(v)
            },
            message: props => `${props.value} it's not a valid URL`
        },
        // validate: [/^https*/, 'Invalid URL!'] // Might work
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    },
    accessories: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Accessory',
        }
    ],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }

})

const Cube = new mongoose.model('Cube', cubeSchema)

module.exports = Cube;