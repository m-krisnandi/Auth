const express = require('express');
const router = express.Router();
const { index } = require('./controller');
const { verifyUser } = require('../../middleware/auth');

router.get('/', verifyUser, index);

module.exports = router;
