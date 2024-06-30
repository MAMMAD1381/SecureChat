const express = require('express');
const router = express.Router();

// controllers


// middlewares
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')
const checkFields = require('../middlewares/checkFields')

router.post('/create', authenticate('Bearer'), authorize(['admin', 'super']), getGroups);
router.get('/group/:groupName', authenticate('Bearer'), authorize(['user', 'admin', 'super']), getAllGroups);
router.get('/cert/:cert', authenticate('Bearer'), authorize(['user', 'admin', 'super']), getGroupCert);

module.exports = router;
