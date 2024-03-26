module.exports = {
  index: async (req, res) => {
    try {
      const title = 'Dashboard Page';
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };
      const user = req.session.user;

      res.render('index', {
        title,
        alert,
        user,
        url: req.originalUrl,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
