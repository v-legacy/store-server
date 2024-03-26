const express = require('express');
const router = express.Router();
const {
  index,
  viewCreate,
  storeNominal,
  editNominal,
  updateNominal,
  deleteNominal,
} = require('./controller');

const { isLogin } = require('../middleware/auth');

router.use(isLogin);
router.get('/', index);
router.get('/create', viewCreate);
router.post('/store', storeNominal);
router.get('/edit/:id', editNominal);
router.put('/edit/:id', updateNominal);
router.delete('/delete/:id', deleteNominal);

module.exports = router;
