const express = require('express');
const router = express.Router();

const { index } = require('./controller');
const { isLogin } = require('../middleware/auth');

router.use(isLogin);
router.get('/', index);
// router.get('/create', viewCreate);
// router.post('/store', storeTransaction);
// router.get('/edit/:id', viewEdit);
// router.put('/update/:id', updateTransaction);
// router.delete('/delete/:id', deleteTransaction);

module.exports = router;
