const express = require('express');
const router = express.Router();
const multer = require('multer');
const os = require('os');
const {
  index,
  viewCreate,
  storeVoucher,
  viewEdit,
  updateVoucher,
  deleteVoucher,
  statusVoucher,
} = require('./controller');

const { isLogin } = require('../middleware/auth');

router.use(isLogin);

router.get('/', index);
router.get('/create', viewCreate);
router.post(
  '/store',
  multer({ dest: os.tmpdir() }).single('thumbnail'),
  storeVoucher
);
router.get('/edit/:id', viewEdit);
router.put(
  '/update/:id',
  multer({ dest: os.tmpdir() }).single('thumbnail'),
  updateVoucher
);
router.delete('/delete/:id', deleteVoucher);
router.put('/status/:id', statusVoucher);

module.exports = router;
