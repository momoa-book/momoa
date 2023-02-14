const { User } = require('../model');
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
​
exports.email = async(req, res) => {
​   let transporter = nodemailer.createTransport({
        host: ''
    })

    //인증코드 생성
    let authCode = '';

    //사용자가 입력한 ID(=이메일)로 인증코드 발송
    let info = await transporter.sendMail({
        from: '"momoa" <momoa@google.com>',
        to: userEmail,
        subject: 'momoa 인증코드 메일',
        html: '<h3>본 메일은 momoa 회원가입을 위한 이메일 인증을 위한 인증코드 발송 메일입니다.</h3>'
         + '<p>아래 인증코드를 15분 이내에 입력하여 인증을 완료해주세요.</p>'
         + authCode
    })
}