const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

const { HttpCode } = require('./helpers/constants');
const routerUsers = require('./routers/users.routers');
const routerContacts = require('./routers/contacts.routers');

app.use(cors('*'));
app.use(express.json());

app.use('/contacts', routerContacts);
app.use('/users', routerUsers);

app.post('/', (req, res, next) => {
  const config = {
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
      user: 'shapoval_sergey92@meta.ua',
      pass: process.env.PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: 'shapoval_sergey92@meta.ua',
    to: 'noresponse@gmail.com',
    subject: 'Nodemailer test',
    text: 'Привет. Мы тестируем отправку писем!',
  };

  transporter
    .sendMail(emailOptions)
    .then(info => console.log(info))
    .catch(err => console.log(err));
});

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
