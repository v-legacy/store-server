const Transaction = require('./model');
const Player = require('../player/model');
module.exports = {
  // index: async (req, res) => {
  //   try {
  //     const title = 'Transaction Page';
  //     const alertMessage = req.flash('alertMessage');
  //     const alertStatus = req.flash('alertStatus');
  //     const alert = {
  //       message: alertMessage,
  //       status: alertStatus,
  //     };
  //     const player = await Player.find();
  //     const data = await Transaction.find().populate('player');
  //     console.log(data);
  //     const user = req.session.user;
  //     console.log(req.originalUrl);
  //     res.render('admin/transaction/view_transaction', {
  //       title,
  //       alert,
  //       user,

  //       url: req.originalUrl,
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //     req.flash('alertMessage', `${error.message}`);
  //     req.flash('alertStatus', 'danger');
  //     res.redirect('/bank');
  //   }
  // },
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const transaction = await Transaction.find().populate('player');

      res.render('admin/transaction/view_transaction', {
        data: transaction,
        alert,
        name: req.session.user.name,
        title: 'Halaman metode pembayaran',
        user: req.session.user,
        url: req.originalUrl,
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/transactions');
    }
  },
  viewCreate: async (req, res) => {
    try {
      const title = 'Form Tambah Transaction';
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };
      const category = await Category.find();
      const nominal = await Nominal.find();
      res.render('admin/transaction/create', {
        title,
        category,
        nominal,
        alert,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/transaction');
    }
  },
  storeTransaction: async (req, res) => {
    try {
      const { category, nominal, title, date, type, price } = req.body;
      const transaction = await Transaction({
        category,
        nominal,
        title,
        date,
        type,
        price,
      });
      await transaction.save();
      req.flash('alertMessage', 'Success Create Transaction');
      req.flash('alertStatus', 'success');
      res.redirect('/transaction');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/transaction');
    }
  },
};
