var express = require('express');
var router = express.Router();
const { body, validationResult, check } = require('express-validator');
const {
  index,
  viewCreate,
  storeCategory,
  viewEdit,
  updateCategory,
  deleteCategory,
} = require('./controller');
/* GET home page. */
const { isLogin } = require('../middleware/auth');

router.use(isLogin);
router.get('/', index);
router.get('/create', viewCreate);
router.post(
  '/store',
  [check('name').notEmpty().withMessage('Name cannot be empty')],
  storeCategory
);
router.get('/edit/:id', viewEdit);
router.put('/edit/:id', updateCategory);
router.delete('/delete/:id', deleteCategory);

module.exports = router;
