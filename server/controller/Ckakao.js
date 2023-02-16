const { User } = require('../model');
const axios = require('axios');
require('dotenv').config();

//토큰 요청할 카카오 서버 옵션
// curl -v -X POST "https://kauth.kakao.com/oauth/token" \
//  -H "Content-Type: application/x-www-form-urlencoded" \
//  -d "grant_type=" \
//  -d "client_id=${REST_API_KEY}" \
//  --data-urlencode "redirect_uri=${REDIRECT_URI}" \
//  -d "code=${AUTHORIZE_CODE}"
const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';
const GRANT_TYPE = 'authorization_code';
const REST_API_KEY = process.env.KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;

// 카카오 로그인
// 1. 인가 코드 발급 요청(프론트에서 완료)
// 2. 사용자 인증 후 로그인 요청 시 전달받은 인가 코드로 토큰 요청
exports.getKakao = async (req, res) => {
  let code = req.body.authcode;
  console.log(`인가 코드 : ${req.body.authcode}`);
  axios({
    url: `${KAKAO_TOKEN_URL}?grant_type=${GRANT_TYPE}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((result) => {
    console.log(`토큰 : ${result.data.access_token}`);
  });
};

//회원 확인 및 가입
// 1. 받은 토큰으로 사용자 정보 가져오기 요청
// 2. 제공받은 사용자 정보로 가입여부 확인
// 가입된 경우 : 서비스 로그인 단계 수행
// 가입 안된 경우 : DB에 회원정보 등록 후 서비스 로그인 단계 수행

//서비스 로그인
// 1. 세션 발급
