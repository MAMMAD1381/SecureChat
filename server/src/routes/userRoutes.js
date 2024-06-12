const express = require('express');
const { registerUser, loginUser, getUserPublicKey } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/publickey/:userID', getUserPublicKey);

module.exports = router;
