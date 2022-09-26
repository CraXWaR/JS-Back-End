const router = require('express').Router();
const { create } = require('../services/dataService');

router.get('/', (req, res) => {
    res.render('create')
});

router.post('/', async (req, res) => {
    try {
        const result = await create(req.body);

        res.redirect('/details/' + result.id);
    } catch (err) {
        res.redirect('404');
    }
});

module.exports = router;