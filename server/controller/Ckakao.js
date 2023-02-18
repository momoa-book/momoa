const { User } = require('../model');
const axios = require('axios');
require('dotenv').config();

//토큰 요청할 카카오 서버 옵션
const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';
const GRANT_TYPE = 'authorization_code';
const REST_API_KEY = process.env.KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;

// 카카오 로그인
exports.KakaoLogin = async (req, res, next) => {
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
  console.log(`{
    엑세스 토큰 : ${get_token.data.access_token}, 
    엑세스 토큰 만료시간 : ${get_token.data.expires_in}, 
    리프레시 토큰 : ${get_token.data.refresh_token},
    리프레시 토큰 만료시간: ${get_token.data.refresh_token_expires_in}
    }`);

  let token = {
    access_token: get_token.data.access_token,
    refresh_token: get_token.data.refresh_token,
  };

  //받은 토큰으로 사용자 정보 가져오기 요청
  let user_info = await axios({
    url: 'https://kapi.kakao.com/v2/user/me',
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  });
  console.log(`유저 이메일 : ${user_info.data.kakao_account.email}`);
  console.log(`유저 닉네임 : ${user_info.data.kakao_account.profile.nickname}`);
  let get_user = {
    user_email: user_info.data.kakao_account.email,
    user_name: user_info.data.kakao_account.profile.nickname,
    refresh_token: token.refresh_token,
  };

  //가입여부 확인하여 가입처리 후 로그인처리
  //가입 된 이메일인 경우 로그인처리
  let find_user = await User.findOne({
    where: {
      user_email: get_user.user_email,
    },
  });
  console.log(`찾기: ${find_user}`);

  //jwt 발행(todo) 후 로그인처리

  if (find_user == null) {
    let join = await User.create(get_user);
    res.status(200).json({ token });
  } else {
    res.status(200).json({ token });
  }
};
