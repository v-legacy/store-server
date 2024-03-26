const mongoose = require('mongoose');
const transactionSchema = mongoose.Schema({
  historyTopup: {
    gameName: {
      type: String,
      require: [true, 'Field Game Name is required'],
    },
    category: {
      type: String,
      require: [true, 'Field Category is required'],
    },
    coinName: {
      type: String,
      require: [true, 'Field Coin Name is required'],
    },
    coinQuantity: {
      type: Number,
      require: [true, 'Field Coin Quantity is required'],
    },
    price: {
      type: Number,
      require: [true, 'Field Price is required'],
    },
    thumbnail: {
      type: String,
    },
  },
  historyPayment: {
    name: {
      type: String,
      require: [true, 'Field Name is required'],
    },
    type: {
      type: String,
      require: [true, 'Field Type is required'],
    },
    bankName: {
      type: String,
      require: [true, 'Field Bank Name is required'],
    },
    noRekening: {
      type: String,
      require: [true, 'Field No Rekening is required'],
    },
  },
  name: {
    type: String,
    require: [true, 'Field Name is required'],
    maxlength: [225, 'Name must be less than 225 characters'],
    minlength: [3, 'Name must be more than 3 characters'],
  },
  accountUser: {
    type: String,
    require: [true, 'Field Account User is required'],
    maxlength: [225, 'Account User must be less than 225 characters'],
    minlength: [3, 'Account User must be more than 3 characters'],
  },
  tax: {
    type: Number,
    default: 0,
  },
  value: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['Pending', 'Success', 'Failed'],
    default: 'Pending',
  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
  },
  historyUser: {
    name: {
      type: String,
      require: [true, 'Field Name is required'],
    },
    phoneNumber: {
      type: String,
      require: [true, 'Field Phone Number is required'],
      maxlength: [13, 'Phone Number must be less than 13 characters'],
      minlength: [10, 'Phone Number must be more than 10 characters'],
    },
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports - mongoose.model('Transaction', transactionSchema);
