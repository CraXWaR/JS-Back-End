const { createCourse, getById } = require('../services/courseService');
const { parseError } = require('../util/parser');

const courseController = require('express').Router();


courseController.get('/create', (req, res) => {
    res.render('create-course', {
        title: 'Create Course'
    });
});
//after all other "get" requests cuz' of the match
courseController.get('/:id', async (req, res) => {
    const course = await getById(req.params.id);

    course.isOwner = course.owner.toString() == req.user._id.toString();

    res.render('course-details', {
        title: course.title,
        course
    });
});

courseController.post('/create', async (req, res) => {
    const course = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        duration: req.body.duration,
        owner: req.user._id
    };

    try {
        await createCourse(course);
        res.redirect('/');
    } catch (error) {
        res.render('create-course', {
            title: 'Create Course',
            errors: parseError(error),
            body: course
        });
    }

});

module.exports = courseController;