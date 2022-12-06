const User = require('./model');
const argon2 = require('argon2');
const Mailer = require('../mailer/model');
const Wallet = require('../wallet/model');
const Currency = require('../currency/model');

module.exports = {
  index: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ['uuid', 'email'],
        include: [
          {
            model: Mailer,
            as: 'mailer',
            attributes: ['status'],
          },
          {
            model: Wallet,
            as: 'wallets',
            attributes: ['amount'],
            include: [
              {
                model: Currency,
                as: 'currency',
                attributes: ['total'],
              },
            ],
          },
        ],
      });
      res.status(200).json({ users });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Internal server error' });
    }
  },

  signup: async (req, res) => {
    const { email, password, confPassword } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    if (password !== confPassword)
      return res
        .status(400)
        .json({ message: 'Password dan Confirm Password tidak cocok!' });
    const hashPassword = await argon2.hash(password);
    try {
      await User.create({
        email: email,
        password: hashPassword,
      });

      res.status(201).json({ message: 'Registrasi Berhasil!' });
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  },

  signin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (!existingUser) {
        return res.status(400).json({ message: 'Email tidak ditemukan!' });
      }

      const validPassword = await argon2.verify(
        existingUser.password,
        password
      );
      if (!validPassword) {
        return res.status(400).json({ message: 'Password salah!' });
      }
      // if (existingUser.status === 'pending') {
      //   return res
      //     .status(401)
      //     .json({ message: 'Pending Account. Please Verify Your Email!' });
      // }
      res.status(200).json({ message: 'Login Berhasil!' });
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  },
};
