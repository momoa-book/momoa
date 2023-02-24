const express = require('express');
const router = express.Router();
const controllerSignUp = require('../controller/Csignup');
const controllerSignIn = require('../controller/Csignin');
const controllerRefreshToken = require('../controller/CrefreshToken');
const middlewareVerifyToken = require('../middleware/VerifyToken');
const controllerKakao = require('../controller/Ckakao');
const controllerMain = require('../controller/Cmainleft');
const controllerData = require('../controller/CSheetData');

// import { getUsers } from '../controllers/Users.js';
// const controller = require('../controller/Cmain');

//이메일 인증요청
router.post('/check_email', controllerSignUp.send_code);

//회원가입
router.post('/signup', controllerSignUp.approve_code);
router.post('/signup2', controllerSignUp.finish_signup);

//카카오 로그인
router.post('/getkakao', controllerKakao.KakaoLogin);

//로그인
router.post('/signin', controllerSignIn.user_signin);

//로그아웃
router.get('/logout', controllerSignIn.user_logout);

//카카오와 함께 로그아웃
router.get('/kakaologout', controllerKakao.KakaoLogout);

//메인화면 랜더링될때마다 refreshToken을 갱신해주는 api ->맨 첫페이지에서 useeffect로 함수걸어줘야됨
router.get('/token', controllerRefreshToken.refreshToken);

//이 코드의 밑에있는 것들은 전부 미들웨어를 거치게 된다.
router.all('*', middlewareVerifyToken.verifyToken);

router.get('/verify', controllerRefreshToken.verifyToken);

//마이페이지 or 캘린더화면 처럼 유저 정보뿌려주는 화면에서 요청할 api
router.get('/users', controllerSignIn.getUsers);

//메인화면 모든 정보 불러오기
router.get('/getsheetdata', controllerData.getsheetdata);

//sheet_id가져오는

router.get('/getsheetid', controllerMain.get_sheetid);

//개인정보가져오는
router.get('/getpersonalinfo', controllerMain.get_personalinfo);

//메인화면 모든 정보 불러오기
// router.get(
//   '/getmain',
//   middlewareVerifyToken.verifyToken,
//   controllerMain.get_main
// );

//수입지출등등입력하는 왼쪽 상단부
router.post('/writeinfo', controllerMain.write_info);

//목표금액 입력하는
router.post('/writegoal', controllerMain.write_goal);

//초대할때 유저검색하면 유저정보 반환해주는

router.get('/getUserByEmail', controllerMain.getUserByEmail);

module.exports = router;
