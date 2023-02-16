const express = require('express');
const router = express.Router();
const controllerSignUp = require('../controller/Csignup');
const controllerSignIn = require('../controller/Csignin');
const controllerKakao = require('../controller/Ckakao');
// const controller = require('../controller/Cmain');

// router.post('/login', controller.login);

//이메일 인증요청
router.post('/check_email', controllerSignUp.send_code);

//회원가입
router.post('/signup', controllerSignUp.approve);

//로그인 하면 메인페이지로
// router.get('/login', controller.login_main);

//로그인
router.post('/signin', controllerSignIn.user_signin);

//로그아웃
router.delete('/logout', controllerSignIn.user_logout);

router.get('/accesstoken', controllerSignIn.accessToken);
router.get('/refreshtoken', controllerSignIn.refreshToken);

//로그인성공시 보여주는
// router.get('/lognin/success', loginSuccess);

//카카오 로그인 인가코드 전달
router.post('/getkakao', controllerKakao.getKakao);

module.exports = router;
