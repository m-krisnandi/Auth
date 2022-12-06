const User = require('../app/users/model');
const Otp = require('../app/mailer/model');
const sendEmail = require('../config/nodemailer');

// Generates a random 6 digit number for OTP.
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// Validates email.
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

module.exports = {
  register: (req, res) => {
    const { email, password } = req.body;

    console.log(req.body);

    // Check if email already exists.
    User.findOne({ where: { email } }, (err, user) => {
      if (err) return res.send('Error occured' + err.message);
      if (user) {
        return res.send('Email/Phone already exists.');
      } else {
        // Adding user to DB and sending OTP to email/phone.
        User.create({ email: email, password: password }, (err, user) => {
          if (err) return res.send('Error occured' + err.message);

          const otp = generateOtp();

          if (validateEmail(email)) {
            // SENDING EMAIL and adding OTP to DB.
            console.log('email.');
            sendEmail(user.email, otp)
              .then((result) => {
                Otp.create({ otp: otp, userId: user._id });
              })
              .catch((err) => console.log(err));
          } else {
            return res.send('Invalid phone/email.');
          }

          return res.status(201).send('OTP sent. Valid for only 1 hour.');
        });
      }
    });
  },

  verify: (req, res) => {
    const { otp, email } = req.body;

    // Finding the user provided OTP in the DB.
    Otp.findOne({ otp: otp }, async (err, otp) => {
      console.log('OTP:' + otp);
      if (!otp) {
        return res.send('Incorrect OTP');
      }

      const isExist = await User.exists({ _id: otp.userId });
      if (!isExist) {
        return res.send('Incorrect OTP or it has been expired.');
      }

      // If OTP founded then finding the associated user with this OTP using user ID.
      User.findById(otp.userId, async (err, user) => {
        // If the current email and the email in DB matches then
        // update the "verified" to "true"
        if (email == user.email) {
          await User.findByIdAndUpdate(otp.userId, { verified: true });
          await Otp.deleteOne({ _id: otp._id });

          res.send(`${email} has been successfully verified`);
        } else {
          res.send('Incorrect OTP or it has been expired.');
        }
      });
    });
  },
};
