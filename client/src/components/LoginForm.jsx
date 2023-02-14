import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function EmailLogin() {
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
      <form className="space-y-4 md:space-y-4" action="#">
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

        <div>
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
        </div>

        <Link
          to="/" // 링크 변경해야 함
          className=" text-xs font-medium text-purple-700 hover:underline dark:text-purple-700"
        >
          <p className="mt-4">비밀번호를 잊으셨나요?</p>
        </Link>

        <button type="submit" className="user-submit-btn">
          이메일로 로그인
        </button>
      </form>
    </>
  );
}
