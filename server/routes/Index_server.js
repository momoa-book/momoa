const express = require('express');
const router = express.Router();
const controllerSign = require('../controller/Csign');
const controllerSignIn = require('../controller/Csignin');
const controllerMail = require('../controller/Cmail');
// const controller = require('../controller/Cmain');

// router.post('/login', controller.login);
router.post('/signup', controller.signup);

// 메인 페이지 및 세션 체크
router.get('/', controller.main);

//로그인 하면 메인페이지로
// router.get('/login', controller.login_main);

//로그인
router.post('/signin', controllerSignIn.user_signin);

//로그아웃
router.delete('/logout', controlleSignIn.user_logout);

module.exports = router;
