const { json } = require('express');
const Category = require('./model');
const { body, validationResult } = require('express-validator');
module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };
      const user = req.session.user;

      const data = await Category.find();
      console.log(req.originalUrl);
      res.render('admin/category/view_category', {
        title: 'Category Page',
        data,
        alert,
        user,
        url: req.originalUrl,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
      console.log(error);
    }
  },
  viewCreate: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const error = validationResult(req);
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };
      console.log(req.originalUrl);
      res.render('admin/category/create', {
        title: 'Form Tambah Category',
        alert,
        error,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('back');
    }
  },
  storeCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        req.flash('alertMessage', error.mapped());
        req.flash('alertStatus', 'danger');
        res.redirect('back');
      } else {
        let category = await Category.create({ name });
        await category.save().then(() => {
          req.flash(
            'alertMessage',
            'Category berhasil ditambah ' + `"${name}"`
          );
          req.flash('alertStatus', 'success');
          res.redirect('/category');
        });
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('back');
      console.log(error);
    }
  },
  viewEdit: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };
      const { id } = req.params;
      let category = await Category.findOne({ _id: id });
      console.log(category);
      res.render('/admin/category/edit', {
        title: 'Form Edit Category',
        category,
        alert,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      console.log(error);
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      let category = await Category.updateOne(
        { _id: id },
        {
          name: name,
        }
      ).then((result) => {
        req.flash(
          'alertMessage',
          `Category name ${id} berhasil diupdate ${name}`
        );
        req.flash('alertStatus', 'success');
        res.redirect('/category');
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('back');
      console.log(error.reason);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.deleteOne({
        _id: id,
      });
      console.log(category.name);
      if (category.deletedCount == 1) {
        req.flash(
          'alertMessage',
          `Category name ${id} berhasil didelete ${category.name}`
        );
        req.flash('alertStatus', 'success');
        console.log(category);
        res.redirect('/category');
      }
    } catch (error) {
      console.log(error);
    }
  },
};
