const homeController = require('express').Router();

//TODO real controller
homeController.get('/', (req, res) => {
    res.render('home', {
        title: 'Home Page'
    });
});

module.exports = homeController;