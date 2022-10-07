const express = require('express');
const { registerUser, checkForUser, createToken } = require('../services/authService');
const router = express.Router();

//Register routes
router.get('/register', (req, res) => {
    res.render('auth/registerPage');
});
router.post('register', async (req, res) => {
    try {
        const { username, password, rePass } = req.body;
        if (password != rePass) {
            throw new Error('Password doesn\'t match!');
        } else {
            await registerUser(username, password);
        }
    } catch (error) {
        return res.status(400).render('auth/registerPage', { error: error.message });

    }
    res.redirect('/login')
})

//Login routes
router.get('/login', (req, res) => {
    res.render('auth/loginPage');
});
router.post('login', async (req, res) => {
    const { username, password } = req.body;
    const user = await checkForUser(username, password);
    try {
        if (user) {
            const token = await createToken(user);
            res.cookie('app_token', token, {
                httpOnly: true,
            });
            res.redirect('/');
        } else {
            throw new Error ('Invalid username or password!');
        }
    } catch (error) {
        return res.status(400).render('auth/loginPage', { error: err.message });
    }
});

//Logout route
router.get('/logout', (req, res) => {
    res.clearCookie('app_token');
    res.redirect('/');
});

module.exports = router;