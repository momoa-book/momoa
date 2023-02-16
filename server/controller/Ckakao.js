const { User } = require('../model');
const axios = require('axios');
require('dotenv').config();

//토큰 요청할 카카오 서버 옵션
const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';
const GRANT_TYPE = 'authorization_code';
const REST_API_KEY = process.env.KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;

// 카카오 로그인
exports.getKakao = async (req, res) => {
  let code = req.body.authcode;
  console.log(`인가 코드 : ${req.body.authcode}`);

  //사용자 인증 후 로그인 요청 시 전달받은 인가 코드로 토큰 요청
  let get_token = await axios({
    url: `${KAKAO_TOKEN_URL}?grant_type=${GRANT_TYPE}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  console.log(`토큰 : ${get_token.data.access_token}`);
  let token = get_token.data.access_token;

  //받은 토큰으로 사용자 정보 가져오기 요청
  let user_info = await axios({
    url: 'https://kapi.kakao.com/v2/user/me',
    headers: {
      Authorization: `Bearer ${get_token.data.access_token}`,
    },
  });
  console.log(`유저 정보(닉네임) : ${user_info.data.properties.nickname}`);
  let user = user_info.data.properties.nickname;

  //가입여부 확인
  let find_user = await User.findOne({
    where: {},
  });
};

//회원 확인 및 가입

// 2. 제공받은 사용자 정보로 가입여부 확인
// 가입된 경우 : 서비스 로그인 단계 수행
// 가입 안된 경우 : DB에 회원정보 등록 후 서비스 로그인 단계 수행

//서비스 로그인
// 1. 세션 발급
