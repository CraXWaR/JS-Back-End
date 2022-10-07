const express = require('express');
const { createAccessory, getAllWithout, attachAccessory } = require('../services/accessoryService');
const { getOneCube } = require('../services/cubeService');
const router = express.Router();

//Create Accessory
router.get('/create', (req, res) => {
    res.render('accessory/create');

});
router.post('/create', async (req, res) => {
    const accessory = req.body;
    await createAccessory(accessory);
    res.redirect('/');
});

//Attach  accessory
router.get('/:id/attach', async (req, res) => {
    const cubeId = req.params.id;
    const cube = await getOneCube(cubeId);
    const accessoriesArr = cube.accessories?.map((e) => e._id);
    const accessories = await getAllWithout(accessoriesArr);
    res.render('accessory/attach', { cube, accessories });

});

router.post('/:id/attach', async (req, res) => {
    const cubeId = req.params.id;
    const accessoryId = req.body.accessory;
    await attachAccessory(cubeId, accessoryId);
    res.redirect('/');

});

module.exports = router;