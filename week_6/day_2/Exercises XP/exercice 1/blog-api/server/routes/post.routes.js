const express = require('express');
const c = require('../controllers/post.controller');

const router = express.Router();
router.get('/', c.getAll);
router.get('/:id', c.getOne);
router.post('/', c.create);
router.put('/:id', c.update);
router.delete('/:id', c.remove);

module.exports = router;
