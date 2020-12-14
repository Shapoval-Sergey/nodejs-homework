const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();

class EmailService {
  #sender = nodemailer;
  #GenerateTemplate = Mailgen;

  #createTemplate(verifyToken, name) {
    const mailGenerator = new this.#GenerateTemplate({
      theme: 'default',
      product: {
        name: 'System Contacts',
        link: 'http://localhost:3000/',
      },
    });
    const template = {
      body: {
        name,
        intro:
          'Welcome to System Cats! Were are very excited to have you on board',
        action: {
          instructions:
            'To get started with System Contacts, please click here:',
          button: {
            color: '#228C66',
            text: 'Confirm your account',
            link: `http://localhost:3000/users/verify/${verifyToken}`,
          },
        },
        outro:
          'Need help, or have questions? Just reply to this email, wed love to help.',
      },
    };
    const emailBody = mailGenerator.generate(email);
    return emailBody;
  }
  async sendEmail(verifyToken, email, name) {
    const emailBody = this.#createTemplate(verifyToken, name);
    const config = {
      host: 'smtp.meta.ua',
      port: 465,
      secure: true,
      auth: {
        user: 'shapoval_sergey92@meta.ua',
        pass: process.env.PASSWORD,
      },
    };

    const transporter = this.#sender.createTransport(config);
    const emailOptions = {
      from: 'shapoval_sergey92@meta.ua',
      to: email,
      subject: 'Nodemailer test',
      html: emailBody,
    };

    await transporter.sendMail(emailOptions);
  }
}

module.exports = EmailService;

// app.post('/', (req, res, next) => {

// });
