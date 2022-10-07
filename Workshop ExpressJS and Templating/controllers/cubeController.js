const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router()
const { createCube, getOneCube, editCube, deleteCube } = require("../services/cubeService");

// Create route
router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', authMiddleware, async (req, res) => {
    try {
        const cube = req.body;
        const id = req.user._id;
        await createCube(cube, id)
        res.redirect('/');
    } catch (err) {
        res.status(401).render('create', { error: err.message })
    }
})
//Details route
router.get('/details/:id', async (req, res) => {

    const id = req.params.id;
    const cube = await getOneCube(id);
    const accessories = cube.accessories;
    const isOwn = req.user._id == cube.creator;

    res.render('details', { cube, accessories, isOwn })
})

//Edit
router.get('/details/:id/edit', async (req, res) => {
    try {
        const id = req.params.id;
        const cube = await getOneCube(id);
        if(cube._id == res.locals.user._id){
            res.render('editCubePage', { cube })
        }else {
            throw new Error('You are not authorized to edit/delete this cube!')
        }
    } catch (error) {
        res.status(401).render('404', {error: error.message})
    }
})
router.post('/details/:id/edit', async (req, res) => {
    try {
        await editCube(req.params.id, req.body)
        res.redirect(`/cube/details/${req.params.id}`)
    } catch (err) {
        res.status(401).render('create', { error: err.message })
    }
})

//Delete
router.get('/details/:id/delete', async (req, res) => {
    try {
        const id = req.params.id;
        const cube = await getOneCube(id);
        if(cube._id == res.locals.user._id){
            res.render('deleteCubePage', { cube })
        }else {
            throw new Error('You are not authorized to edit/delete this cube!')
        }
    } catch (error) {
        res.status(401).render('404', {error: error.message})
    }
})
router.post('/details/:id/delete', (req, res) => {
    const id = req.params.id;
    deleteCube(id)
    res.redirect('/')
})

module.exports = router;