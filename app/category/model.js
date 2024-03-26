const mongoose = require('mongoose');
let categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Field Name Category required'],
  },
});

module.exports = mongoose.model('Category', categorySchema);
