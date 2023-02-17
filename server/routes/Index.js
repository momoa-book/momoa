const express = require('express');
const router = express.Router();
const controllerSignUp = require('../controller/Csignup');
const controllerSignIn = require('../controller/Csignin');
const controllerRefreshToken = require('../controller/CrefreshToken');
const middlewareVerifyToken = require('../middleware/VerifyToken');
const controllerKakao = require('../controller/Ckakao');
// const controller = require('../controller/Cmain');

//이메일 인증요청
router.post('/check_email', controllerSignUp.send_code);

//회원가입
router.post('/signup', controllerSignUp.approve);

//카카오 로그인 인가코드 전달
router.post('/getkakao', controllerKakao.getKakao);

//마이페이지 or 캘린더화면 처럼 유저 정보뿌려주는 화면에서 요청할 api
router.get(
  '/users',
  middlewareVerifyToken.verifyToken,
  controllerSignIn.getUsers
);

//메인화면 랜더링될때마다 refreshToken을 갱신해주는 api ->맨 첫페이지에서 useeffect로 함수걸어줘야됨
router.get('/token', controllerRefreshToken.refreshToken);

//로그인
router.post('/signin', controllerSignIn.user_signin);

//로그아웃
router.delete('/logout', controllerSignIn.user_logout);

//테스트용
// router.post('/users', controllerSignIn.Register);

module.exports = router;
