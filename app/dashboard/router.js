const express = require('express');
const router = express.Router();
const { index } = require('./controller');

const { isLogin } = require('../middleware/auth');
router.use(isLogin);

router.get('/', index);

module.exports = router;
