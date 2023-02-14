import React from 'react';
import { ReactComponent as Logo2 } from '../assets/logo2.svg';
import Toggle from './Toggle';
import { Link } from 'react-router-dom'; // 필요 없음 사실..
import { atom, useRecoilState } from 'recoil';

export const isClickedAtom = atom({
  key: 'isClicked',
  default: false,
});

export default function AccountNav() {
  const [clicked, setClicked] = useRecoilState(isClickedAtom);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() => setClicked(!clicked)}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <Link to="/" className="flex ml-2 md:mr-24">
                <Logo2 className="h-8 mr-3" width="50px" height="50px" />

                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  모모아 Momoa
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                {/* <img 공유 했을 시 접속 사용자 보여줄 때 활용하기
                  className="w-8 h-8 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="user photo"
                /> */}
                <Toggle />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
