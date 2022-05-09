const express = require('express');
var router = require('./router/router.js');
const bodyParser = require('body-parser');
const { handleError } = require('./helpers/error');
const db = require('./db/db.js');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(function (err, req, res, next) {
  handleError(err, res);
});
try {
  db.authenticate().then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
      db.sync({ force: true }).then(() => {
        console.log('All models synched');
      });
    });
  });
} catch (error) {
  console.log(error);
}
