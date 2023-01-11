const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (username, password) => {
    await user.create({ username, password });

}

const checkForUser = async (username, password) => {
    try {
        const findUser = await user.findOne({ username });
        const isValid = await bcrypt.compare(password, findUser.password);
        if (isValid) {
            return user;
        } else {
            throw { message: 'Cannot find username of password' };
        }
    } catch (err) {
        console.log(err);
    }
};

const createToken = (user) => {
    const payload = {
        _id: user._id,
        username: user.username,

    }

    return new Promise((resolve, reject) => {
        jwt.sign(payload, 'ASDPI-93KLASJD02', function (err, token) {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        })
    })
};

module.exports = {
    registerUser,
    checkForUser,
    createToken,

}