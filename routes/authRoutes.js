const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', authController.showLogin);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
