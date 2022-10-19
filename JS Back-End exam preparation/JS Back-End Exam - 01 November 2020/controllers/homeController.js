const homeController = require('express').Router();

//TODO real controller
homeController.get('/', (req, res) => {

    if (req.user) {
        //user homepage
        res.render('user-home', {
            title: 'Home Page',
        });
    } else {
        //guest homepage
        res.render('guest-home', {
            title: 'Home Page',
        });
    }
});

module.exports = homeController;