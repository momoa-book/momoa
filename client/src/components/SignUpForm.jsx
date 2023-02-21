import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUpForm() {
  const [Email, setEmail] = useState('');
  const [signupCode, setsignupCode] = useState();
  const [emailError, setEmailError] = useState(null);
  const [emailCheck, setEmailCheck] = useState(false);
  const [codeError, setCodeError] = useState(null);
  const navigate = useNavigate();

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

  const createAccount = () => {
    setEmailCheck(!emailCheck);
    axios({
      url: 'http://localhost:5000/api/check_email',
      method: 'POST',
      withCredentials: true,
      data: {
        user_email: Email,
      },
    })
      .catch((err) => {
        console.log(err.response.data);
        setEmailError(err.response.data.msg);
      })
      .then((res) => {
        console.log(`이메일 발송: ${res.status}`);
        // if (res.status === 200) {
        // } else {
        //   setEmailError(res.data.msg);
        // }
      });
  };

  const codeConfirm = () => {
    console.log(Email);
    axios({
      url: 'http://localhost:5000/api/signup',
      method: 'POST',
      withCredentials: true,
      data: {
        code: signupCode,
        user_email: Email,
      },
    })
      .catch((err) => {
        setCodeError(err.response.data.msg);
      })
      .then((res) => {
        console.log(res.data.msg);
        // if (res.status === 200) {
        setTimeout(() => {
          navigate('/infoset');
        }, 2000);
        // } else setCodeError(res.data.msg);
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
          <button
            type="button"
            onClick={createAccount}
            className="user-submit-btn"
          >
            이메일로 시작하기
          </button>
        )}

        {emailCheck === true && (
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
              onClick={codeConfirm}
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
