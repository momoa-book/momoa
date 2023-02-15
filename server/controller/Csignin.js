const { User } = require('../model');

//로그인 페이지
// exports.login_main = (req, res) => {
//     res.render('login');
// }

//로그인 기능
exports.user_signin = (req, res) => {
  User.findAll({
    where: { user_id: req.body.id, user_pw: req.body.pw },
    limit: 1,
  }).then((result) => {
    console.log(result);
    if (result.length > 0) {
      req.session.user = req.body.id;
      console.log('세션 : ', req.session);
      res.send(true);
    } else {
      console.log('로그인 실패');
      res.send(false);
    }
  });
};

//로그아웃
exports.user_logout = (req, res) => {
  req.session.destroy(function (err) {
    if (err) throw err;
    res.send(true);
  });
};
