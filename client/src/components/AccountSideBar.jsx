import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { isClickedAtom } from '../atoms/InterfaceAtom';
import { HiPlusCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUsers from './useUsers';

export default function AccountSideBar() {
  const clicked = useRecoilValue(isClickedAtom);
  const navigate = useNavigate();
  const { data, status } = useUsers();
  //console.log(data);
  //console.log(status);

  function newSheet() {
    axios
      .post('http://localhost:5000/api/', {
        // user_id: 토큰이든 세션이든 로컬스토리지든 저장된 유저아이디 같이 보내주기
      })
      .then((res) => {
        console.log(res.data);
        // 이 부분은 고민.. 딱히 받을게 없는것 같은데
        // 대신 자동으로 아래 배열 업뎃되어서 사이드바 바뀔 수 있도록 해주어야함
      });
  }

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
            {/* status 로딩중이면 아무것도 렌더하지않고 로딩 완료 되었을 때 map 실행 */}
            {status === 'loading' ? (
              <></>
            ) : (
              <>
                {data.map((el) => {
                  return (
                    <li key={el.id}>
                      <span
                        onClick={() => {
                          navigate(`/account/${el.id}`);
                        }}
                        className="flex items-center p-3 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer"
                      >
                        {el.name}
                      </span>
                    </li>
                  );
                })}{' '}
              </>
            )}
            <li>
              <span
                onClick={newSheet}
                className="flex items-center p-3 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer"
              >
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
