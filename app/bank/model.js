const mongoose = require('mongoose');
const bankSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Field name is required'],
  },
  bankName: {
    type: String,
    require: [true, 'Field name bank is required'],
  },
  noRekening: {
    type: String,
    require: [true, 'Field no rekening is required'],
  },
});

module.exports = mongoose.model('Bank', bankSchema);
