const express = require('express');
const { startGame, getBoard, handleHit } = require('../controllers/sessions');

const router = express.Router();

router.post('/start', startGame);
router.get('/board/:sessionId', getBoard);
router.post('/hit/:sessionId', handleHit);

module.exports = router;
