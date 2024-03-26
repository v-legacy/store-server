const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {
  index,
  viewCreate,
  storeBank,
  updateBank,
  deleteBank,
  viewEdit,
} = require('./controller');

const { isLogin } = require('../middleware/auth');

router.use(isLogin);
router.get('/', index);
router.get('/create', viewCreate);
router.post(
  '/store',
  [
    check('name').notEmpty().withMessage('Name cannot be empty'),
    check('nameBank').notEmpty().withMessage('Name Bank cannot be empty'),
    check('noRekening').notEmpty().withMessage('No Rekening cannot be empty'),
  ],
  storeBank
);
router.get('/edit/:id', viewEdit);
router.put('/update/:id', updateBank);
router.delete('/delete/:id', deleteBank);

module.exports = router;
