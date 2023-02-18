const { User } = require('../model');
// const userDatabase = require('../model/Database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// import bcrypt from 'bcrypt';

//jwt 테스트

//원하는 정보들 조회하는
exports.getUsers = async (req, res) => {
  // console.log(req.decoded);
  // console.log(req.decoded.user_name);
  // console.log(req.decoded.user_pw);
  console.log(req.body);
  try {
    // let data = {
    //   user_pw: req.body.user_pw,
    // };

    const users = await User.findOne({
      //한명의 정보만 조회하기때문에 유저가 동시접속 몇명하든 상관없이 findone으로 조회
      where: {
        user_email: req.decoded.user_email,
        ////여기에서 req.decoded에 담아서 보냈기때문에 이걸 받는 controller의 getusers에서 user_email: req.decoded.user_email,라고 받는다!
        // user_name: req.decoded.user_name,
      },
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

exports.Register = async (req, res) => {
  const { user_name, user_email, user_pw, confPassword } = req.body;
  if (user_pw !== confPassword)
    return res.status(400).json({ msg: '비밀번호가 일치하지 않습니다' });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(user_pw, salt);
  try {
    await User.create({
      user_name: user_name,
      user_email: user_email,
      user_pw: hashPassword,
    });
    res.json({ msg: '등록 완료' });
  } catch (error) {
    console.log(error);
  }
};

exports.user_signin = async (req, res) => {
  try {
    const user = await User.findAll({
      where: {
        user_email: req.body.user_email,
      },
    });
    // console.log(req.body);
    const match = await bcrypt.compare(req.body.user_pw, user[0].user_pw);
    // console.log(match);
    if (!match) return res.status(400).json({ msg: '비밀번호가 틀렸습니다' });
    const user_email = user[0].user_email;
    const user_name = user[0].user_name;
    console.log(process.env.ACCESS_TOKEN_SECRET);
    const accessToken = jwt.sign(
      { user_email, user_name },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '10m',
      }
    );
    console.log(accessToken);
    const refreshToken = jwt.sign(
      { user_email, user_name },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '1d',
      }
    );
    // console.log(refreshToken);
    console.log('액세스토큰', accessToken);
    console.log('액세스토큰2', { accessToken });
    await User.update(
      { refresh_token: refreshToken },
      {
        where: {
          user_email: user_email,
        },
      }
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken }); //로그인할때 accesstoken 보내줌
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: '이메일을 찾을 수 없습니다' });
  }
};

exports.user_logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await User.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const user_email = user[0].user_email;
  await User.update(
    { refresh_token: null },
    {
      where: {
        user_email: user_email,
      },
    }
  );
  res.clearCookie('refreshToken');
  return res.sendStatus(200);
};

//로그인 페이지
// exports.login_main = (req, res) => {
//     res.render('login');
// }

//로그인 기능
// exports.user_signin = (req, res) => {
//   User.findAll({
//     where: { user_id: req.body.id, user_pw: req.body.pw },
//     limit: 1,
//   }).then((result) => {
//     console.log(result);
//     if (result.length > 0) {
//       req.session.user = req.body.id;
//       console.log('세션 : ', req.session);
//       res.send(true);
//     } else {
//       console.log('로그인 실패');
//       res.send(false);
//     }
//   });
// };

//로그아웃
// exports.user_logout = (req, res) => {
//   req.session.destroy(function (err) {
//     if (err) throw err;
//     res.send(true);
//   });
// };
