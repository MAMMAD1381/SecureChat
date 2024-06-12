const express = require('express');
const router = express.Router();

// const { registerUser, loginUser, getUserPublicKey } = require('../controllers/userController');
const registerUser = require('../controllers/user/register')
const loginUser = require('../controllers/user/login')
const getUserPublicKey = require('../controllers/user/publicKey')
const getUsers = require('../controllers/user/users')

// middlewares
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')
const checkFields = require('../middlewares/checkFields')

router.post('/register', checkFields(['username', 'email', 'password', 'confirmPassword']), registerUser);
router.post('/login', checkFields(['username', 'password']), loginUser);
router.get('/publickey/:username', authenticate('Bearer'), authorize(['user', 'admin', 'super']), getUserPublicKey);
router.get('/', authenticate('Bearer'), authorize(['user', 'admin', 'super']), getUsers);

module.exports = router;
