const mongoose = require('mongoose');
const nominalSchema = mongoose.Schema({
  coinQuantity: {
    type: Number,
    default: 0,
  },
  coinName: {
    type: String,
    require: [true, 'Field Coin Name is requried'],
  },
  price: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Nominal', nominalSchema);
