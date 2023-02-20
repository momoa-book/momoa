import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { isClickedAtom } from '../atoms/InterfaceAtom';
import { HiPlusCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export default function AccountSideBar() {
  const clicked = useRecoilValue(isClickedAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (clicked === true) {
      document
        .getElementById('logo-sidebar')
        .classList.remove('-translate-x-full');
    } else {
      document
        .getElementById('logo-sidebar')
        .classList.add('-translate-x-full');
    }
  }, [clicked]);

  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-40 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="h-full px-3 overflow-y-auto bg-white dark:bg-gray-800">
          <ul>
            <li>
              <span className="flex p-3 text-base font-bold text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ">
                유저 아이디
              </span>
            </li>

            <li>
              <span
                onClick={() => {
                  navigate('/account');
                }}
                className="flex p-3 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer"
              >
                가계부
              </span>
            </li>

            <li>
              <span className="flex items-center p-3 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer">
                새 문서 <HiPlusCircle className="h-5 w-5 ml-auto" />
              </span>
            </li>

            <li>
              <span
                onClick={() => {
                  navigate('/account/mypage');
                }}
                className="flex mt-6 p-3 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer"
              >
                마이페이지
              </span>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
