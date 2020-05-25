const mongoose = require('mongoose');
const config = require('config');
// const db = config.get('mongoURI');
const db = 'mongodb://localhost/nocovid_test'

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      //setting from MongoDB Atlas
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};
module.exports = connectDB;
