const User = require('../user/model');
const bcrypt = require('bcryptjs');
module.exports = {
  index: (req, res) => {
    try {
      if (req.session.user) {
        res.redirect('/dashboard');
      }
      const title = 'User Page';
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };
      res.render('admin/user/view_signin', {
        title,
        alert,
      });
    } catch (error) {}
  },
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (user) {
        if (user.status === 'Y') {
          const checkPassword = await bcrypt.compare(password, user.password);
          if (checkPassword) {
            req.session.user = {
              id: user._id,
              email: user.email,
              status: user.status,
              name: user.name,
            };
            // console.log(req.session);
            res.redirect('/dashboard');
          } else {
            req.flash('alertMessage', 'Password yang anda masukkan salah');
            req.flash('alertStatus', 'danger');
            res.redirect('back');
          }
        } else {
          req.flash('alertMessage', 'Akun anda belum aktif');
          req.flash('alertStatus', 'danger');
          res.redirect('back');
        }
      } else {
        req.flash('alertMessage', 'Email yang anda masukkan tidak terdaftar');
        req.flash('alertStatus', 'danger');
        res.redirect('back');
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('back');
    }
  },
  signOut: (req, res) => {
    req.session.destroy();
    res.redirect('/');
  },
};
