import React from 'react';
import { useRecoilState } from 'recoil';
import { showModalAtom } from '../atoms/InterfaceAtom';
import { HiOutlineXCircle } from 'react-icons/hi';

export default function Modal() {
  const [isShow, setisShow] = useRecoilState(showModalAtom);

  return (
    <>
      {isShow ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full min-[1080px]:w-1/2 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 dark:bg-gray-800 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 dark:bg-gray-800 rounded-t">
                  <h3 className="text-3xl text-gray-800 dark:text-gray-50 font-semibold">
                    새로운 가계부 생성
                  </h3>
                  <HiOutlineXCircle
                    className="h-8 w-8 ml-auto hover:cursor-pointer"
                    onClick={() => setisShow(false)}
                  />
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="my-4 text-gray-600 dark:text-gray-50 ">
                    <div className="flex">
                      <input
                        type="text"
                        //onChange={(e) => setNum(inputGoalFormat(e.target.value))}
                        className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:ring-2 focus:ring-purple-300"
                        placeholder="이메일로 초대해보세요."
                      />
                      <button
                        // onClick={() => {}}
                        className="min-[1080px]:w-1/5 w-1/3 focus:outline-none bg-purple-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 "
                      >
                        초대
                      </button>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setisShow(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setisShow(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
