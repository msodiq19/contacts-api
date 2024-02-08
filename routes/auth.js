const express = require('express');
const { signin, signup } = require('../controllers/auth')
const router = new express.Router();

router.post('/login', signin)
router.post('/signup', signup)

module.exports = router
