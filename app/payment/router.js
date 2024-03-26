const express = require('express');
const router = express.Router();

const {
  index,
  viewCreate,
  actionStore,
  viewEdit,
  actionUpdate,
  actionDelete,
} = require('./controller');

const { isLogin } = require('../middleware/auth');

router.use(isLogin);
router.get('/', index);
router.get('/create', viewCreate);
router.post('/store', actionStore);
router.get('/edit/:id', viewEdit);
router.put('/update/:id', actionUpdate);
router.delete('/delete/:id', actionDelete);

module.exports = router;
