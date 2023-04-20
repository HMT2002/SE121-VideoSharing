const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //1. create transporter

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    post: process.env.EMAIL_PORT,
    service: 'gmail',

    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
    //
  });
  //2. define the email options
  const mailOptions = {
    from: 'Mailing System VideoSharing <blueseamailtest@gmail.com>',
    to: options.email,
    subject: options.subject,

    text: options.message,
    // html:
  };
  //3. Actually send email

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
