const nodemailer = require('nodemailer');
const config = require('../config/config');

// Function to send email.
const sendEmail = async (email, otp) => {
  try {
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });

    const mailOptions = {
      from: 'Verification <mkrisnandi08@gmail.com>',
      to: email,
      subject: 'Verify your email',
      text: `Your OTP is ${otp}.\nDo not share with anyone`,
    };

    const results = await transport.sendMail(mailOptions, (error, info) => {
      console.log(info);
    });
    return results;
  } catch (error) {
    return error;
  }
};

module.exports = sendEmail;
