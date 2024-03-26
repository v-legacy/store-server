const Bank = require('./model');
const { validationResult } = require('express-validator');
module.exports = {
  index: async (req, res) => {
    try {
      const title = 'Bank Page';
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };
      const user = req.session.user;

      const bank = await Bank.find();
      res.render('admin/bank/view_bank', {
        alert,
        title,
        data: bank,
        user,
        url: req.originalUrl,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },
  viewCreate: async (req, res) => {
    try {
      const title = 'Form Tambah Bank ';
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };

      res.render('admin/bank/create', {
        title,
        alert,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStats', `danger`);
      res.redirect('/bank');
    }
  },
  storeBank: async (req, res) => {
    try {
      const { name, nameBank, noRekening } = req.body;

      const error = validationResult(req);
      if (!error.isEmpty()) {
        req.flash('alertMessage', error.mapped());
        req.flash('alertStatus', 'danger');
        res.redirect('back');
      } else {
        const bank = await Bank.create({
          name,
          nameBank,
          noRekening,
        });
        await bank.save().then(() => {
          req.flash('alertMessage', `data bank ${name} berhasil ditambah`);
          req.flash('alertStatus', 'success');
          res.redirect('/bank');
        });
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const title = 'Form Edit Bank';
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };

      const { id } = req.params;
      const bank = await Bank.findOne({ _id: id });
      res.render('admin/bank/edit', {
        title,
        alert,
        bank,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', `danger`);
      res.redirect('back');
    }
  },
  updateBank: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, nameBank, noRekening } = req.body;
      const bank = await Bank.findOneAndUpdate(
        { _id: id },
        {
          name,
          nameBank,
          noRekening,
        }
      ).then(() => {
        req.flash('alertMessage', `Bank id : ${id} berhasil diupdate`);
        req.flash('alertStatus', 'success');
        res.redirect('/bank');
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('back');
    }
  },
  deleteBank: async (req, res) => {
    try {
      const { id } = req.params;
      await Bank.findOneAndDelete({ _id: id }).then(() => {
        req.flash('alertMessage', `Bank id : ${id} berhasil didelete`);
        req.flash('alertStatus', 'success');
        res.redirect('/bank');
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('back');
    }
  },
};
