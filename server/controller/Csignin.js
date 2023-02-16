const { User } = require('../model');
const userDatabase = require('../model/Database');
const jwt = require('jsonwebtoken');

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

//jwt 테스트
exports.user_signin = (req, res, next) => {
  const { user_id, password } = req.body;
  const userInfo = userDatabase.filter((item) => {
    return item.usesr_id === user_id;
  })[0];

  if (!userInfo) {
    res.status(403).json('권한이 없습니다');
  } else {
    try {
      //access token 발급
      const accessToken = jwt.sign(
        {
          user_id: userInfo.user_id,
          user_name: userInfo.user_name,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: '1m',
          issuer: 'About Tech',
        }
      );

      //refresh token 발급
      const refreshToken = jwt.sign(
        {
          user_id: userInfo.user_id,
          user_name: userInfo.user_name,
        },
        process.env.REFRESH_SECRET,
        {
          expiresIn: '24h',
          issuer: 'About Tech',
        }
      );

      //token 전송
      res.cookies('accessToken', accessToken, {
        secure: false,
        httpOnly: true,
      });

      res.cookies('refreshToken', refreshToken, {
        secure: false,
        httpOnly: true,
      });
      res.status(200).json('로그인 성공');
    } catch (error) {}
  }
};

exports.accessToken = (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, process.env.ACCESS_SECRET);

    const userData = userDatabase.filter((item) => {
      // return item.email === data.email;
      return item.user_id === data.user_id;
    })[0];

    const { password, ...others } = userData;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.refreshToken = (req, res) => {
  //access token을 갱신
  try {
    const token = req.cookies.refreshToken;
    const data = jwt.verify(token, process.env.REFRESH_SECRET);
    const userData = userDatabase.filter((item) => {
      // return item.email === data.email;
      return item.user_id === data.user_id;
    })[0];

    const accessToken = jwt.sign(
      {
        user_id: userData.user_id,
        user_name: userData.user_name,
      },
      process.env.ACCESS_SECRET,
      {
        expiresIn: '1m',
        issuer: 'About Tech',
      }
    );

    res.cookie('accessToken', accessToken, {
      secure: false,
      httpOnly: true,
    });
    res.status(200).json('access token 재발급');
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.loginSucess = (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, process.env.ACCESS_SECRET);

    const userData = userDatabase.filter((item) => {
      // return item.email === data.email;
      return item.user_id === data.user_id;
    })[0];
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.user_logout = (req, res) => {
  try {
    res.cookie('accessToken', '');
    res.status(200).json('로그아웃 성공');
  } catch (error) {
    res.status(500).json(error);
  }
};
