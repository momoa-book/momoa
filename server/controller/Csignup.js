const { User } = require('../model');
const nodemailer = require('nodemailer');

//인증코드(6자리 랜덤숫자) 생성 함수
function createAuthCode() {
  let authCode = '';
  authCode = String(Math.floor(Math.random() * 1000000));
  return authCode;
}

//이메일 유효성 검사, 인증코드 발송
exports.send_code = async (req, res) => {
  //이메일 유효성 검사(중복확인)
  let find_email = await User.findOne({
    where: { id: req.query.id },
  });

  //중복될 경우 false
  if (find_email) {
    res.send({ status: false });
  }

  //중복이 아닌 경우 인증코드 발송
  else {
    //인증코드 생성
    createAuthCode();

    //메일 발송 함수
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'localhost',
      port: process.env.PORT,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //메일 옵션
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: 'momoa 인증코드 메일',
      html:
        '<h3>본 메일은 momoa 회원가입을 위한 이메일 인증을 위한 인증코드 발송 메일입니다.</h3>' +
        '<p>아래 인증코드를 15분 이내에 입력하여 인증을 완료해주세요.</p>' +
        authCode,
    };

    //사용자가 입력한 ID(=이메일)로 메일 발송
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(error);
      } else {
        console.log(`Email sent : ${info.response}`);
      }
    });

    //세션 생성 - 인증코드 15분간 저장
    req.session.code = authCode;

    //메일발송 완료
    res.send({ status: true });
  }
};

//인증코드 확인, 회원가입 완료
exports.approve = async (req, res) => {
  //세션에 저장해 둔 코드와 사용자가 입력한 코드가 일치하는지 확인
  //일치한다면 DB에 회원정보 등록 및 가입절차 완료
  if (req.body.code === req.session.code) {
    let user_info = {
      email: req.body.email,
      pw: req.body.pw,
    };
    let register = await User.create(user_info);
    console.log(`회원가입 완료 : ${register}`);
    res.send({ status: true });
  } else if (req.session.code === null) {
    res.send({
      msg: '인증 유효시간이 지나 인증할 수 없습니다. 인증코드를 재발급해주세요.',
      status: false,
    });
  } else
    res.send({
      msg: '인증코드가 일치하지 않습니다. 다시 한 번 확인해주세요.',
      status: false,
    });
};
