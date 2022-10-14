const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const JWT_SECRET = '56dsa4d6as85dsa';


async function register(username, password) {
    const exist = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (exist) {
        throw new Error('Username is taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
       username,
       hashedPassword 
    });

    // TODO if registation creeates user session
    const token = createSession(user);
    
    return token;
}

async function login() {

}

function createSession({ _id, username }) {
    const payload = {
        _id,
        username
    };

    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

function verifyToken() {
    
}

module.exports = {
    register,
    login,
    verifyToken
};