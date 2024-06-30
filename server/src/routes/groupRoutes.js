const express = require('express');
const router = express.Router();

// controllers
const getGroups = require('../controllers/group/getGroups')
const createGroups = require('../controllers/group/createGroup')
const inviteMember = require('../controllers/group/inviteMember')
const removeMember = require('../controllers/group/removeMember')
const acceptGroupInvitation = require('../controllers/group/acceptGroupInvitation')
const rejectGroupInvitation = require('../controllers/group/rejectGroupInvitation')
const getGroupInvitations = require('../controllers/group/getGroupInvitations')
const deleteGroup = require('../controllers/group/deleteGroup')
const getAllGroups = require('../controllers/group/getAllGroups')
const getGroupCert = require('../controllers/group/getGroupCert')

// middlewares
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')
const checkFields = require('../middlewares/checkFields')

router.get('/groups', authenticate('Bearer'), authorize(['user', 'admin', 'super']), getGroups);
router.get('/allGroups', authenticate('Bearer'), authorize(['super']), getAllGroups);
router.post('/create', authenticate('Bearer'), checkFields(['groupName', 'description']), authorize(['admin', 'super']), createGroups);
router.post('/delete', authenticate('Bearer'), checkFields(['groupName']), authorize(['super']), deleteGroup);
router.post('/inviteMember', authenticate('Bearer'), checkFields(['groupName', 'member']), authorize(['admin', 'super']), inviteMember);
router.patch('/removeMember', authenticate('Bearer'), checkFields(['groupName', 'member']), authorize(['admin', 'super']), removeMember);
router.post('/invitation/accept', authenticate('Bearer'), checkFields(['groupName']), authorize(['user', 'admin', 'super']), acceptGroupInvitation);
router.post('/invitation/reject', authenticate('Bearer'), checkFields(['groupName']), authorize(['user', 'admin', 'super']), rejectGroupInvitation);
router.get('/invitations', authenticate('Bearer'), authorize(['user', 'admin', 'super']), getGroupInvitations);
router.get('/cert/:cert', authenticate('Bearer'), authorize(['user', 'admin', 'super']), getGroupCert);

module.exports = router;
