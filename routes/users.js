const express = require('express');
const router = express.Router();

const UsersController = require('../controller/users.controller');
const usersController = new UsersController();

// 회원가입 API
router.post('/signup', usersController.signUp);

// 로그인 API
router.post('/login', usersController.login);

module.exports = router;
