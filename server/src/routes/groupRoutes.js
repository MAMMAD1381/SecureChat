const express = require('express');
const router = express.Router();


const getGroups = require('../controllers/group/getGroups')
const createGroups = require('../controllers/group/createGroup')
const inviteMember = require('../controllers/group/inviteMember')
const removeMember = require('../controllers/group/removeMember')
const acceptGroupInvitation = require('../controllers/group/acceptGroupInvitation')
const rejectGroupInvitation = require('../controllers/group/rejectGroupInvitation')
const getGroupInvitations = require('../controllers/group/getGroupInvitations')

// middlewares
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')
const checkFields = require('../middlewares/checkFields')

router.get('/groups', authenticate('Bearer'), authorize(['user', 'admin', 'super']), getGroups);
router.post('/create', authenticate('Bearer'), checkFields(['groupName', 'description', 'users']), authorize(['admin', 'super']), createGroups);
router.post('/inviteMember', authenticate('Bearer'), checkFields(['groupName', 'member']), authorize(['admin', 'super']), inviteMember);
router.patch('/removeMember', authenticate('Bearer'), checkFields(['groupName', 'member']), authorize(['admin', 'super']), removeMember);
router.post('/invitation/accept', authenticate('Bearer'), checkFields(['groupName']), authorize(['user', 'admin', 'super']), acceptGroupInvitation);
router.post('/invitation/reject', authenticate('Bearer'), checkFields(['groupName']), authorize(['user', 'admin', 'super']), rejectGroupInvitation);
router.get('/invitations', authenticate('Bearer'), authorize(['user', 'admin', 'super']), getGroupInvitations);

module.exports = router;
