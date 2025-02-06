const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const characterController = require('../controllers/characterController');

router.get('/', authMiddleware, characterController.getAllCharacters);
router.get('/search', authMiddleware, characterController.searchCharacter);
router.get('/:name', authMiddleware, characterController.getCharacterByName);

module.exports = router;
