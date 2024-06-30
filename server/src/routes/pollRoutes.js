const express = require('express');
const router = express.Router();

// controllers
const createPoll = require('../controllers/poll/createPoll')
const getCert = require('../controllers/poll/getCert')
const getPolls = require('../controllers/poll/getPolls')
const registerVote = require('../controllers/poll/registerVote')

// middlewares
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')
const checkFields = require('../middlewares/checkFields')

router.post('/create', authenticate('Bearer'), checkFields(['groupName', 'question', 'options']), authorize(['admin', 'super']), createPoll);
router.get('/group/:groupName', authenticate('Bearer'), authorize(['user', 'admin', 'super']), getPolls);
router.post('/group/:groupName/vote', authenticate('Bearer'), checkFields(['pollId', 'vote']), authorize(['user', 'admin', 'super']), registerVote);
router.get('/cert/:cert', authenticate('Bearer'), authorize(['user', 'admin', 'super']), getCert);

module.exports = router;
