const express = require('express');
const helmet = require('helmet');
const path = require('path');
const message = require('./config/message');
const app = express();
app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '12kb' }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.get('/api/message', (_req, res) => res.json(message));
app.use('/api/replies', require('./routes/replyRoutes'));
app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use('/api', (_req, res) => res.status(404).json({ error: 'API không tồn tại.' }));
app.use((_req, res) => res.status(404).send('Trang không tồn tại.'));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Có lỗi máy chủ. Vui lòng thử lại sau.' });
});
module.exports = app;
