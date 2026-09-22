// conte express = require('express');
// const ronte = express.ronte();
// const {login} = require('../controller/auth')

// router.post('/login',login)

// module.exports = ronte

const express = require('express');
const router = express.Router();
const { login } = require('../controller.js/auth');

router.post('/login', login);

module.exports = router;
