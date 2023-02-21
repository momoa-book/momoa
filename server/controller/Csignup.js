const { User } = require('../model');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();
const session = require('express-session');

//인증코드(6자리 랜덤숫자) 생성 함수
let authCode = '';
function createAuthCode() {
  authCode = String(Math.floor(Math.random() * 1000000));
  return authCode;
}

//이메일 유효성 검사, 인증코드 발송
exports.send_code = async (req, res) => {
  //이메일 유효성 검사(중복확인)
  let find_email = await User.findOne({
    where: { user_email: req.body.user_email },
  });

  //중복될 경우 false
  if (find_email) {
    res.status(500).send({ msg: '이미 가입된 이메일입니다.' });
  } else {
    req.session.user_email = req.body.user_email;
    //인증코드 생성
    createAuthCode();
    console.log(`인증코드 생성 : ${authCode}`);
    //메일 발송 함수
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 587,
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
      to: req.body.user_email,
      subject: 'momoa 인증코드 메일',
      html:
        '<h3>본 메일은 momoa 회원가입을 위한 이메일 인증을 위한 인증코드 발송 메일입니다.</h3>' +
        '<p>아래 인증코드를 15분 이내에 입력하여 인증을 완료해주세요.</p>' +
        `<h2>${authCode}</h2>`,
    };

    //사용자가 입력한 ID(=이메일)로 메일 발송
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        res.status(500).send('이메일 발송 실패');
      } else {
        console.log(info);
        req.session.email_authCode = authCode;
        req.session.save(() => {
          res.status(200).send('이메일 발송 성공');
        });
      }
    });
  }
};

//인증코드 확인, 회원가입 완료
exports.approve = async (req, res) => {
  //세션에 저장해 둔 코드와 사용자가 입력한 코드가 일치하는지 확인
  //일치한다면 DB에 회원정보 등록 및 가입절차 완료
  if (req.body.code == authCode) {
    let register = await User.create({
      user_email: req.body.user_email,
    });
    console.log(`회원가입 완료 : ${register}`);
    res.status(200).send('회원가입 완료');
  } else if (req.body.code === null) {
    res.status(500).send({
      msg: '인증 유효시간이 지나 인증할 수 없습니다. 인증코드를 재발급해주세요.',
    });
  } else
    res.status(400).send({
      msg: '인증코드가 일치하지 않습니다. 다시 한 번 확인해주세요.',
    });
};

exports.first_login = async (req, res) => {
  await User.update({
    user_name: req.body.user_name,
    user_pw: req.body.user_pw,
    where: {
      user_email: req.session.user_email,
    },
  });
};
