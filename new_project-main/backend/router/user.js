const express = require('express');
const router = express.Router();

const { getUser } = require('../controller.js/user');

const verifyToken = require('../middleware/verifyToken');

// router.get('/user', getUser);
router.get('/user', verifyToken('evaluatee','admin'),getUser);

module.exports = router;
