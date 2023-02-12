import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as Logo2 } from '../assets/logo2.svg';
import Kakao from '../assets/kakao.svg';

export default function Login() {
  // const [emailLogin, setEmailLogin] = useState(false);
  const [Email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);

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
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <Logo2 width="50px" height="50px" />
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                로그인
              </h1>
              <form className="space-y-4 md:space-y-4" action="#">
                <div>
                  <button type="button" className=" user-primary-btn">
                    <div className="flex justify-center">
                      <img
                        src={Kakao}
                        width="20px"
                        alt="kakao"
                        className="mr-4"
                      />
                      카카오로 로그인
                    </div>
                  </button>

                  <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />

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
                </div>
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
                  />
                </div> */}

                <Link
                  to="/" // 링크 변경해야 함
                  className=" text-xs font-medium text-purple-700 hover:underline dark:text-purple-700"
                >
                  <p className="mt-4">비밀번호를 잊으셨나요?</p>
                </Link>

                <button type="submit" className="user-submit-btn">
                  이메일로 로그인
                </button>

                <Link
                  to="/signup"
                  className=" text-sm text-right font-medium text-gray-400 hover:underline dark:text-gray-400 "
                >
                  <p className="mt-4">가입하기</p>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
