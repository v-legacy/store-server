const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Field Name is required'],
  },
  email: {
    type: String,
    require: [true, 'Field Email is required'],
  },
  password: {
    type: String,
    require: [true, 'Field Password is required'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  status: {
    type: String,
    enum: ['Y', 'N'],
    default: 'Y',
  },
  phoneNumber: {
    type: String,
  },
});

module.exports = mongoose.model('User', userSchema);
