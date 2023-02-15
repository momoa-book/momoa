const express = require('express');
const router = express.Router();
const controller = require('../controller/Csign');
const controller = require('../controller/Csignin');
// const controller = require('../controller/Cmain');

router.post('/login', controller.login);
router.post('/signup', controller.signup);

// 메인 페이지 및 세션 체크
router.get('/', controller.main);

//로그인 하면 메인페이지로
// router.get('/login', controller.login_main);

//로그인
router.post('/signin', controller.user_signin);

//로그아웃
router.delete('/logout', controller.user_logout);

module.exports = router;
