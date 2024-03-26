const Payment = require('./model');
const Bank = require('../bank/model');
module.exports = {
  index: async (req, res) => {
    try {
      const title = 'Payment Page';
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };
      const user = req.session.user;
      const data = await Payment.find().populate('banks');
      console.log(data);
      res.render('admin/payment/view_payment', {
        title,
        alert,
        data,
        user,
        url: req.originalUrl,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },

  viewCreate: async (req, res) => {
    try {
      const title = 'Form Tambah Payment';
      const alertMessage = req.flash('alertMessage');
      const alertStats = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStats,
      };
      const banks = await Bank.find();
      res.render('admin/payment/create', {
        title,
        alert,
        banks,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },

  actionStore: async (req, res) => {
    try {
      const { type, banks } = req.body;
      const payment = await Payment.create({
        type,
        banks,
      });

      payment.save().then(() => {
        req.flash('alertMessage', 'Payment berhasil ditambah');
        req.flash('alertStatus', 'success');
        res.redirect('/payment');
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('back');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const title = 'Form Edit Payment';
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };

      const { id } = req.params;
      const payment = await Payment.findOne({ _id: id });
      const banks = await Bank.find();

      res.render('admin/payment/edit', {
        title,
        payment,
        banks,
        alert,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('back');
    }
  },
  actionUpdate: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, type, bank } = req.body;

      const payment = await Payment.findOneAndUpdate(
        { _id: id },
        {
          name,
          type,
          bank,
        }
      );
      payment.save().then(() => {
        req.flash('alertMessage', 'Payment berhasil diupdate');
        req.flash('alertStatus', 'success');
        res.redirect('/payment');
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('back');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findOneAndDelete({ _id: id });
      req.flash('alertMessage', 'Payment berhasil di hapus');
      req.flash('alertStatus', 'success');
      res.redirect('/payment');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('back');
    }
  },
};
