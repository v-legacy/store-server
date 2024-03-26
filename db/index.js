const mongoose = require('mongoose');
const { urlDb } = require('../config');

main().catch((err) => console.log(err));

async function main() {
  await mongoose
    .connect(urlDb, { serverSelectionTimeoutMS: 500 })
    .then(() => {
      console.log('connected mongoose');
    })
    .catch((err) => console.log(err.reason));
}

const db = mongoose.connection;
// db.on('error', console.log.bind(console, 'connection error'));
// db.once('open', () => {
//   console.log('Server database is connect');
// });

module.exports = { db };
