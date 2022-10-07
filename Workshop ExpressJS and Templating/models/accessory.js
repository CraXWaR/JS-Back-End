const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
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
    }
})

const Accessory = new mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;