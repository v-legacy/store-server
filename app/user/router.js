const express = require('express');

const router = express.Router();

const { index, signIn, signOut } = require('./controller');

router.get('/', index);
router.post('/signin', signIn);
router.get('/signout', signOut);

module.exports = router;
