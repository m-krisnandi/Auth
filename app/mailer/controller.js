const Mailer = require('../mailer/model');

module.exports = {
  index: async (req, res) => {
    try {
      const mailers = await Mailer.findAll();
      res.status(200).json({ mailers });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Internal server error' });
    }
  },
};
