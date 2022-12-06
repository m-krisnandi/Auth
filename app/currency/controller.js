const Currency = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const currencies = await Currency.findAll();
      res.status(200).json({ currencies });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Internal server error' });
    }
  },
};
