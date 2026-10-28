const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const { createReply } = require('../controllers/replyController');
router.post('/', rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: 'draft-7', legacyHeaders: false, message: { error: 'Bạn đã gửi quá nhiều lời nhắn. Vui lòng thử lại sau.' } }), createReply);
module.exports = router;
