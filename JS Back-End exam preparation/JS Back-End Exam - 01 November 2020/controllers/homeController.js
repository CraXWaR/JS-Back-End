const { getAllByDate, getRecent } = require('../services/courseService');

const homeController = require('express').Router();

//TODO real controller
homeController.get('/', async (req, res) => {
    let view;
    let courses = [];
    
    if (req.user) {
        //user homepage
        view = 'user-home';
        courses = await getAllByDate();
    } else {
        //guest homepage
        view = 'guest-home';
        courses = await getRecent();
    }

    res.render(view, {
        title: 'Home Page',
        courses
    });
});

module.exports = homeController;