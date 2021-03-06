const papa = require('papaparse');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const helmet = require('helmet');
const passport = require('passport');
const cookies = require('cookie-session');

let allowedCORS = undefined;

if (process.env.CORS_WHITELIST)
  allowedCORS = papa.parse(process.env.CORS_WHITELIST).data[0];
else
  console.warn('no allowed CORS found');

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedCORS && allowedCORS.indexOf(origin) > -1)
    res.setHeader('Access-Control-Allow-Origin', origin);

  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, Authorization, ' +
    'x-id, Content-Length, X-Requested-With'
  );
  res.header('Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS');

  next();
});

app.use(helmet());
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(cookies({
  domain: process.env['DOMAIN'] || '.',
  name: 'session',
  keys: ['keyy1', 'keyy2'],
  maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));

app.use(require('./routes/user')(io));

app.get('/helloworld', (req, res) => {
  res.status(200).send('Hello, world!');
});

http.listen(8081, () => console.log('Listening on 8081'));

module.exports = app;
