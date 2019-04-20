const mongoose = require('mongoose');
const { DatabaseError } = require('../errors');

const dbName = 'simple_login';
if (!process.env.MONGODB_ENDPOINT || !process.env.MONGODB_USERNAME || !process.env.MONGODB_PASSWORD)
  console.error('invalid mongodb conf');
let endpoint = 'mongodb://' + process.env.MONGODB_ENDPOINT;
if (endpoint[endpoint.length - 1] != '/')
  endpoint += '/';
endpoint += dbName + '?authSource=admin';

mongoose.connect(endpoint, {
  useNewUrlParser: true,
  user: process.env.MONGODB_USERNAME,
  pass: process.env.MONGODB_PASSWORD,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to db');
});

const msgSchema = new mongoose.Schema({
  date: { type: mongoose.Schema.Types.Date, default: Date.now },
  message: String,
  user: String,
});

const Msg = mongoose.model('Msg', msgSchema);

const addMessage = async (user, msg) => {
  const dbMsg = new Msg({
    user,
    message: msg,
  });
  return dbMsg.save();
};

const getMessages = (number = 50, offset = 0) => {
  return Msg.find().sort('-date').limit(number).skip(offset);
};

module.exports = {
  getMessages, addMessage,
};
