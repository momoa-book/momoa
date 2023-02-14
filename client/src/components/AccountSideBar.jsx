import React from 'react';
import { Link } from 'react-router-dom';

export default function AccountSideBar() {
  // const [isDropdown, setisDropdown] = useState(false);

  // function clickDropdown() {
  //   setisDropdown(!isDropdown);
  // }

  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="ml-3">유저 아이디</span>
              </Link>
            </li>

            <li>
              <span className="ml-3 flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                가계부
              </span>

              <ul className="py-2 space-y-2">
                <li>
                  <Link
                    to="/"
                    className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    문서 1
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    문서 2
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    문서 3
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
