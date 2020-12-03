const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
require('dotenv').config();
const app = express();
const multer = require('multer');
const { HttpCode } = require('./helpers/constants');
const routerUsers = require('./routers/users.routers');
const routerContacts = require('./routers/contacts.routers');

const UPLOAD_DIR = path.join(__dirname, process.env.UPLOAD_DIR);
const IMG_DIR = path.join(__dirname, 'public', 'images');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    // cb(null, file.fieldname + '-' + Date.now());
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true);
      return;
    }

    cb(null, false);
  },
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors('*'));
app.use(express.json());

app.use('/contacts', routerContacts);
app.use('/users', routerUsers);

app.use((req, res, next) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: `Use api on routes ${req.baseUrl}/contacts`,
    data: 'Not Found',
  });
});

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR;
  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    message: err.message,
    data: err.status === 500 ? 'Internal Server Error' : err.data,
  });
});

module.exports = app;
