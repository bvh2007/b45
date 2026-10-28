require('dotenv').config();
const app = require('./app');
const { initDatabase } = require('./config/database');
const port = Number(process.env.PORT) || 3000;
initDatabase().then(() => {
  app.listen(port, '0.0.0.0', () => console.log(`Website running at http://localhost:${port}`));
}).catch(err => { console.error('Database startup failed:', err); process.exit(1); });
