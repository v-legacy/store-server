const Voucher = require('./model');
const Category = require('../category/model');
const Nominal = require('../nominal/model');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const config = require('../../config');
const { url } = require('inspector');
module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };
      const title = 'Voucher Page';
      const user = req.session.user;
      const data = await Voucher.find()
        .populate('category')
        .populate('nominal');
      // console.log(data);

      res.render('admin/voucher/view_voucher', {
        title,
        alert,
        data,
        user,
        url: req.originalUrl,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'status');
    }
  },
  viewCreate: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };
      const title = 'Form Tambah Voucher';
      const category = await Category.find();
      const nominal = await Nominal.find();
      res.render('admin/voucher/create', {
        title,
        category,
        nominal,
        alert,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/voucher');
    }
  },
  storeVoucher: async (req, res) => {
    try {
      const { name, category, nominal } = req.body;

      if (req.file) {
        let tmp_file = req.file.path;
        let originalExt =
          req.file.originalname.split('.')[
            req.file.originalname.split('.').length - 1
          ];
        let filename = req.file.filename + '.' + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );
        // console.log([
        //   req.file.filename + '.' + originalExt,
        //   req.file.originalname.split('.')[
        //     req.file.originalname.split('.').length - 1
        //  ],
        //   ]);

        // convert binary data to base64 encoded string

        const src = fs.createReadStream(tmp_file);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on('end', async () => {
          try {
            const voucher = await Voucher.create({
              name,
              category,
              nominal,
              thumbnail: filename,
            });
            voucher.save().then(() => {
              req.flash('alertMessage', 'Voucher berhasil ditambah');
              req.flash('alertStatus', 'success');
              res.redirect('/voucher');
            });
          } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('back');
          }
        });
      } else {
        const voucher = await Voucher.create({
          name,
          category,
          nominal,
        });
        voucher.save().then(() => {
          req.flash('alertMessage', 'Voucher berhasil ditambah');
          req.flash('alertStatus', 'success');
          res.redirect('/voucher');
        });
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('back');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const title = 'Form Edit Voucher';

      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };

      const { id } = req.params;
      const category = await Category.find();
      const nominal = await Nominal.find();
      const voucher = await Voucher.findOne({ _id: id })
        .populate('category')
        .populate('nominal');

      res.render('admin/voucher/edit', {
        title,
        category,
        nominal,
        voucher,
        alert,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('back');
    }
  },

  updateVoucher: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, category, nominal } = req.body;
      if (req.file) {
        const tmp_file = req.file.path;
        const originalExt =
          req.file.originalname.split('.')[
            req.file.originalname.split('.').length - 1
          ];
        let filename = req.file.filename + '.' + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );
        const src = fs.createReadStream(tmp_file);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on('end', async () => {
          const voucher = await Voucher.find({ _id: id });
          let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
          if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
          }
          await Voucher.updateOne(
            { _id: id },
            {
              name,
              category,
              nominal,
              thumbnail: filename,
            }
          ).then(() => {
            req.flash('alertMessage', `Voucher Id: ${id} berhasil diudpate`);
            req.flash('alertStatus', 'success');
            res.redirect('/voucher');
          });
        });
      } else {
        await Voucher.updateOne(
          { _id: id },
          {
            name,
            category,
            nominal,
          }
        ).then(() => {
          req.flash('alertMessage', `Voucher Id :${id} berhasil diupdate`);
          req.flash('alertStatus', 'success');
          res.redirect('/voucher');
        });
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      req.redirect('back');
    }
  },
  deleteVoucher: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findOne({ _id: id });

      await Voucher.findOneAndDelete({ _id: id }).then(() => {
        let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
        // console.log(currentImage);
        if (fs.existsSync(currentImage)) {
          fs.unlinkSync(currentImage);
        }
        req.flash('alertMessage', `Delete id: ${id} berhasil`);
        req.flash('alertStatus', 'success');
        res.redirect('/voucher');
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('back');
    }
  },
  statusVoucher: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findOne({ _id: id });
      let status = voucher.status === 'Y' ? 'N' : 'Y';
      await Voucher.updateOne({ _id: id }, { status }).then(() => {
        req.flash('alertMessage', `Status voucher id: ${id} berhasil diupdate`);
        req.flash('alertStatus', 'success');
        res.redirect('/voucher');
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
    }
  },
};
