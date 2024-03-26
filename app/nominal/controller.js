const Nominal = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const title = 'Nominal Page';
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };
      const user = req.session.user;
      const data = await Nominal.find();

      res.render('admin/nominal/view_nominal', {
        data: data,
        alert,
        title,
        user,
        url: req.originalUrl,
      });
    } catch (error) {
      req.flash('aleretMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
    }
  },
  viewCreate: async (req, res) => {
    try {
      const title = 'Form Tambah Nominal';
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };

      res.render('admin/nominal/create', {
        title,
        alert,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
  storeNominal: async (req, res) => {
    try {
      const { coinQuantity, coinName, price } = req.body;
      const nominal = await Nominal.create({
        coinQuantity,
        coinName,
        price,
      });
      await nominal.save().then((result) => {
        req.flash('alertMessage', `Nominal berhasil ditambah`);
        req.flash('alertStatus', 'success');

        res.redirect('/nominal');
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('back');
    }
  },
  editNominal: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };
      const title = 'Form Edit Nominal';
      const { id } = req.params;
      const data = await Nominal.findOne({ _id: id });

      res.render('admin/nominal/edit', {
        title,
        data,
        alert,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
  updateNominal: async (req, res) => {
    try {
      const { id } = req.params;
      const { coinName, coinQuantity, price } = req.body;
      await Nominal.updateOne(
        { _id: id },
        {
          coinName,
          coinQuantity,
          price,
        }
      ).then(() => {
        req.flash('alertMessage', `Nominal ${id} berhasil diupdate `);
        req.flash('alertStatus', 'success');
        res.redirect('/nominal');
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('back');
    }
  },
  deleteNominal: async (req, res) => {
    try {
      const { id } = req.params;
      await Nominal.deleteOne({ _id: id }).then(() => {
        req.flash('alertMessage', `delete ${id} berhasil`);
        req.flash('alertStatus', 'success');
        res.redirect('back');
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
};
