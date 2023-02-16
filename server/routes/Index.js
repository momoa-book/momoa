const express = require('express');
const router = express.Router();
// const controllerSignUp = require('../controller/Csignup');
const controllerSignIn = require('../controller/Csignin');
// const controllerMail = require('../controller/Cmail');
// const controller = require('../controller/Cmain');

// router.post('/login', controller.login);

// 메인 페이지 및 세션 체크
// router.get('/', controller.main);

//회원가입
// router.post('/signup', controller.signup);

//로그인 하면 메인페이지로
// router.get('/login', controller.login_main);

//로그인
router.post('/signin', controllerSignIn.user_signin);

//로그아웃
router.delete('/logout', controllerSignIn.user_logout);

router.get('/accesstoken', controllerSignIn.accessToken);
router.get('/refreshtoken', controllerSignIn.refreshToken);

//로그인성공시 보여주는
router.get('/lognin/success', loginSuccess);

module.exports = router;
