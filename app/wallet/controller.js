const Wallet = require('../wallet/model');

module.exports = {
  index: async (req, res) => {
    try {
      const wallets = await Wallet.findAll();
      res.status(200).json({ wallets });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Internal server error' });
    }
  },
};
