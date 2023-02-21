const express = require('express');
const router = express.Router();
const controllerSignUp = require('../controller/Csignup');
const controllerSignIn = require('../controller/Csignin');
const controllerRefreshToken = require('../controller/CrefreshToken');
const middlewareVerifyToken = require('../middleware/VerifyToken');
const controllerKakao = require('../controller/Ckakao');
const controllerMain = require('../controller/Cmainleft');

// import { getUsers } from '../controllers/Users.js';
// const controller = require('../controller/Cmain');

//이메일 인증요청
router.post('/check_email', controllerSignUp.send_code);

//회원가입
router.post('/signup', controllerSignUp.approve_code);
router.post('/signup2', controllerSignUp.finish_signup);

//카카오 로그인
router.post('/getkakao', controllerKakao.KakaoLogin);

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
router.post('/users', controllerSignIn.Register);

//이 코드의 밑에있는 것들은 전부 미들웨어를 거치게 된다.
// router.all('*', middlewareVerifyToken, (req,res,next) => {next();});

//차트정보 불러오기
router.get(
  '/getchart',
  middlewareVerifyToken.verifyToken,
  controllerMain.get_chart
);

//수입지출등등입력하는 왼쪽 상단부
router.post(
  '/writeinfo',
  middlewareVerifyToken.verifyToken,
  controllerMain.write_info
);

router.post(
  '/writegoal',
  middlewareVerifyToken.verifyToken,
  controllerMain.write_goal
);

module.exports = router;
