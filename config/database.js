const { Sequelize } = require('sequelize');

const db = new Sequelize('authentication_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// Untuk membuat tabel di database secara otomatis
(async () => {
  await db.sync();
})();

module.exports = db;
