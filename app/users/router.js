const express = require('express');
const { verifyUser } = require('../../middleware/auth');
const { index, signup, signin } = require('./controller');
const router = express.Router();

// router.get('/', verifyUser, index);
router.get('/', index);
router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;
