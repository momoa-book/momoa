const express = require('express');
const router = express.Router();
const controllerSignUp = require('../controller/Csignup');
const controllerSignIn = require('../controller/Csignin');
// const controller = require('../controller/Cmain');

// router.post('/login', controller.login);

// 메인 페이지 및 세션 체크
router.get('/', controller.main);

//이메일 인증요청
router.post('/check_email', controllerSignUp.send_code);

//회원가입
router.post('/signup', controllerSignUp.signup);

//로그인 하면 메인페이지로
// router.get('/login', controller.login_main);

//로그인
router.post('/signin', controllerSignIn.user_signin);

//로그아웃
router.delete('/logout', controlleSignIn.user_logout);

//카카오 가입

module.exports = router;
