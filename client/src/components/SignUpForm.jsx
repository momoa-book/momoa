import React, { useState } from 'react';
import axios from 'axios';

export default function SignUpForm() {
  const [Email, setEmail] = useState('');
  const [signupCode, setsignupCode] = useState();
  const [emailError, setEmailError] = useState(null);
  const [emailCheck, setEmailCheck] = useState(false);
  const [codeError, setCodeError] = useState(null);

  function isVaildEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const onEmailHandler = (event) => {
    if (!isVaildEmail(event.target.value)) {
      setEmailError('유효하지 않은 이메일입니다.');
    } else {
      setEmailError(null);
    }
    setEmail(event.target.value);
  };

  const onCodeHandler = (event) => {
    setsignupCode(event.target.value);
  };

  const login = () => {
    axios({
      url: 'http://localhost:5000/api/check_email',
      method: 'POST',
      withCredentials: true,
      data: {
        user_id: Email,
      },
    }).then((res) => {
      if (res.status === 200) {
        setEmailCheck(emailCheck === true);
      } else {
        setEmailError('이미 등록 된 이메일입니다.');
      }
    });
  };

  const codeConfrim = () => {
    axios({
      url: 'http://localhost:5000/api/signup',
      method: 'POST',
      withCredentials: true,
      data: {
        code: signupCode,
      },
    }).then((res) => {
      if (res.status === 200) {
        setEmailCheck(emailCheck === true);
      } else if (res.status === 400) {
        setCodeError('인증번호가 일치하지 않습니다.');
      }
    });
  };

  return (
    <>
      <form className="space-y-4 md:space-y-4" action="#">
        {!emailCheck && (
          <>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              이메일
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="user-primary-input"
              placeholder="이메일 주소를 입력하세요."
              onChange={onEmailHandler}
            />
            {emailError && (
              <p className="mt-2 mb-2 text-xs font-semibold text-red-600">
                {emailError}
              </p>
            )}
          </>
        )}

        {!emailCheck && (
          <button type="button" onClick={login} className="user-submit-btn">
            이메일로 시작하기
          </button>
        )}

        {emailCheck && (
          <>
            <label
              htmlFor="authcode"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              인증번호
            </label>
            <input
              type="authcode"
              name="authcode"
              id="authcode"
              className="user-primary-input"
              placeholder="인증번호를 입력하세요."
              required=""
              onChange={onCodeHandler}
            />
            {codeError && (
              <p className="mt-2 mb-2 text-xs font-semibold text-red-600">
                {codeError}
              </p>
            )}
            <button
              type="button"
              onClick={codeConfrim}
              className=" text-white w-full bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-gray-800"
            >
              시작하기
            </button>
          </>
        )}

        {/* <div>
  <label
    htmlFor="password"
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >
    비밀번호
  </label>
  <input
    type="password"
    name="password"
    id="password"
    placeholder="비밀번호를 입력하세요."
    className="user-primary-input"
    required=""
    onChange={onPasswordHandler}
  />
</div> */}
      </form>
    </>
  );
}
