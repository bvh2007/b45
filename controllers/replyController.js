const { saveReply } = require('../config/database');
async function createReply(req, res, next) {
  try {
    const message = req.body?.message;
    if (typeof message !== 'string' || message.trim().length < 1 || message.trim().length > 1000) {
      return res.status(400).json({ error: 'Lời nhắn cần có từ 1 đến 1000 ký tự.' });
    }
    await saveReply(message.trim());
    res.status(201).json({ message: 'Cảm ơn cậu đã chia sẻ. Lời nhắn đã được lưu.' });
  } catch (error) { next(error); }
}
module.exports = { createReply };
