import { useContext, useState, useEffect } from "react";
import { Cloudinary } from "cloudinary-core";

import { getUserUploads } from "../../../data/db";
import { AuthContext } from "../../../context/auth";

export const Videos = () => {
  const { user } = useContext(AuthContext);
  const [userValue] = user;

  new Cloudinary({ cloud_name: "dh5acw9p6" });
  const [userVids, setUserVids] = useState(null);

  useEffect(() => {
    const userUploads = userValue ? getUserUploads(userValue.id) : null;
    setUserVids(userUploads);
  }, [userValue, setUserVids]);

  return (
    <div className="w-full h-full flex flex-col mb-8">
      {userVids ? (
        userVids.map((vid) => (
          <div>
            <div
              key={vid.id}
              className="flex md:hidden py-1 border-b border-gray-600 shadow-md"
            >
              <div className="text-white p-4 pr-1 w-1/2 md:w-auto">
                {
                  <img
                    className="md:w-48 md:h-32 rounded shadow-md object-cover"
                    src={vid.thumbnail}
                    alt=""
                  />
                }
              </div>
              <div className="w-full">
                <div className="text-white flex flex-col py-1 px-1">
                  <div className="text-xl px-1 font-semibold pt-2">
                    {vid.title}
                  </div>
                  <div className="text-sm text-gray-500 px-4 pt-1">
                    {vid.description}
                  </div>
                </div>
                <div className="flex text-white space-x-3 py-2">
                  <div className="flex items-center space-x-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                    </div>
                    <div>{vid.likes}</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                        />
                      </svg>
                    </div>
                    <div>{vid.dislikes}</div>
                  </div>
                </div>
              </div>
            </div>

            <div
              key={vid.id}
              className="hidden md:flex py-1 border-b border-gray-600 shadow-md"
            >
              <div className="text-white p-4 pr-1 w-1/2 md:w-auto">
                {
                  <img
                    className="md:w-48 md:h-32 rounded shadow-md object-cover"
                    src={vid.thumbnail}
                    alt=""
                  />
                }
              </div>
              <div className="text-white flex flex-col py-2 px-4 w-2/5">
                <div className="text-xl px-4 font-semibold pt-2">
                  {vid.title}
                </div>
                <div className="text-sm text-gray-500 px-4 pt-1">
                  {vid.description}
                </div>
              </div>
              <div className="flex text-white justify-between w-2/12">
                <div className="flex items-center space-x-3">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-red-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                  </div>
                  <div>{vid.likes}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                      />
                    </svg>
                  </div>
                  <div>{vid.dislikes}</div>
                </div>
              </div>
            </div>

            <div className="flex fixed bottom-0 bg-red-300 p-4 text-white flex justify-center">
              <div>Logout</div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full h-full flex justify-center items-centertext-white">
          Nada
        </div>
      )}
    </div>
  );
};
