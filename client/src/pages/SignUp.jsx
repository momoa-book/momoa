import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as Logo2 } from '../assets/logo2.svg';
import Kakao from '../assets/kakao.svg';

export default function SignUp() {
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
            <div className="p-6 space-y-4 md:space-y-4 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                가입하기
              </h1>
              <p className=" text-sm font-medium text-gray-400 dark:text-gray-400">
                {' '}
                이미 회원이신가요?{' '}
                <Link
                  to="/login"
                  className="hover:underline font-bold text-purple-700 dark:text-purple-700"
                >
                  {' '}
                  로그인
                </Link>{' '}
              </p>
              <form className="space-y-4 md:space-y-4" action="#">
                <div>
                  <button type="button" className="user-primary-btn">
                    <div className="flex justify-center">
                      <img
                        src={Kakao}
                        width="20px"
                        alt="kakao"
                        className="mr-4"
                      />
                      카카오로 시작하기
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
                {/* <label
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
                />

                <button
                  type="submit"
                  className=" text-white w-full bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-gray-800"
                >
                  계정 생성하기
                </button>
                
                
                */}
                <button type="submit" className="user-submit-btn">
                  이메일로 시작하기
                </button>
              </form>

              <p className="text-xs font-normal text-gray-400">
                위의 “카카오/이메일로 시작하기” 클릭 시 모모아의
                <Link to="/" className="underline">
                  {' '}
                  이용약관
                </Link>{' '}
                및
                <Link to="/" className="underline">
                  {' '}
                  개인정보 보호정책
                </Link>{' '}
                을 읽고 이해했으며 그에 동의하는 것으로 간주됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
