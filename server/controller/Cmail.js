const { User } = require('../model');
const nodemailer = require("nodemailer");
​
exports.email = async(req, res) => {
    //이메일 유효성 검사(중복확인)

    
    //인증코드 생성 함수
    function createAuthCode() {
        let authCode = '';
        authCode = String(Math.floor(Math.random()*1000000));
        return authCode;
    };

    //인증코드 생성
    await createAuthCode();

    //메일 발송 함수
​   let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    //메일 옵션
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'momoa 인증코드 메일',
        html: '<h3>본 메일은 momoa 회원가입을 위한 이메일 인증을 위한 인증코드 발송 메일입니다.</h3>'
            + '<p>아래 인증코드를 15분 이내에 입력하여 인증을 완료해주세요.</p>'
            + authCode
    };

    //사용자가 입력한 ID(=이메일)로 메일 발송
    let info = await transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(error);
        } else {
            console.log(`Email sent ${info.response}`)
        }
    });
}