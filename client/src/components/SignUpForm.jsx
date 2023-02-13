import React, { useState } from 'react';

export default function SignUpForm() {
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
    </>
  );
}
