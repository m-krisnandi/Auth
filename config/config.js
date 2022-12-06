const config = {
  SESS_SECRET: '06vUSNEzq1z9U476UrMEx7xIOPGYfu2m',
  JWT_SECRET: '06vUSNE',
  MAIL_SETTINGS: {
    service: 'gmail',
    auth: {
      user: 'mkrisnandi08@gmail.com',
      pass: 'rahasia123',
    },
  },
  OTP_LENGTH: 10,
  OTP_CONFIG: {
    upperCaseAlphabets: false,
    specialChars: false,
  },
};

module.exports = config;
