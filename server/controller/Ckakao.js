const { User } = require('../model');
const axios = require('axios');
require('dotenv').config();

//토큰 요청할 카카오 서버 옵션
const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';
const GRANT_TYPE = 'authorization_code';
const REST_API_KEY = process.env.KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;

// 카카오 로그인
exports.getKakao = async (req, res, next) => {
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
  next(token);
};

//받은 토큰으로 사용자 정보 가져오기 요청
exports.getUserInfo = async (req, res, next, token) => {
  console.log(`받아온 토큰 : ${token}`);
  let user_info = await axios({
    url: 'https://kapi.kakao.com/v2/user/me',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(`유저 이메일 : ${user_info.data.kakao_account.email}`);
  console.log(`유저 닉네임 : ${user_info.data.kakao_account.profile.nickname}`);
  let get_user = {
    user_email: user_info.data.kakao_account.email,
    user_name: user_info.data.kakao_account.profile.nickname,
  };
  next();
};

//가입여부 확인하여 가입처리 후 로그인처리
//가입 된 이메일인 경우 로그인처리
exports.kakaoLogin = async (req, res) => {
  let find_user = await User.findOne({
    attributes: ['user_email'],
    where: get_user,
  });
  console.log(find_user);

  if (find_user == null) {
    let join = await User.create(get_user);
    console.log(join);
    res.redirect(REDIRECT_URI);
  } else {
    res.redirect(REDIRECT_URI);
  }
};
