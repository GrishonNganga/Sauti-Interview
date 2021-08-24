import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../context/auth";
import { Upload } from "./profile/upload";
import { Videos } from "./profile/videos";
import { logoutUser } from "../../data/db";

export const ProfileComponent = () => {
  const { user } = useContext(AuthContext);
  const [userValue, setUser] = user;
  const [loadedComponent, setLoadedComponent] = useState("videos");
  const history = useHistory();

  useEffect(() => {
    if (!userValue) {
      history.push("/");
    }
  });

  const logoutAuthUser = () => {
    logoutUser();
    setUser(null);
  };
  return (
    <div>
      <div className="p-8 md:pl-24">
        <div className="my-8 p-4 text-white font-bold text-2xl">
          Channel Content
        </div>
        <div className="flex space-x-6 my-4 border-t border-b border-gray-600">
          <div
            className={`flex items-center p-4 space-x-1 cursor-pointer transition-colors ${
              loadedComponent === "upload"
                ? " border-b-2 border-red-400"
                : "border-0"
            }`}
            onClick={() => {
              setLoadedComponent("upload");
            }}
          >
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-7 w-7 transition-colors ${
                  loadedComponent === "upload"
                    ? "text-red-400"
                    : "text-gray-400"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </div>
            <div
              className={`font-semibold transition-colors ${
                loadedComponent === "upload" ? "text-white" : "text-gray-400"
              }`}
            >
              Upload
            </div>
          </div>
          <div
            className={`flex items-center space-x-1 p-4 cursor-pointer transition-colors ${
              loadedComponent === "videos"
                ? "border-b-2 border-red-400"
                : "border-0"
            }`}
            onClick={() => {
              setLoadedComponent("videos");
            }}
          >
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-7 w-7 transition-colors ${
                  loadedComponent === "videos"
                    ? "text-red-400"
                    : "text-gray-400"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div
              className={`font-semibold ${
                loadedComponent === "videos" ? "text-white" : "text-gray-400"
              }`}
            >
              Videos
            </div>
          </div>
        </div>
        <div className="h-full">
          {loadedComponent === "videos" ? (
            <Videos />
          ) : (
            <Upload setLoadedComponent={setLoadedComponent} />
          )}
        </div>
      </div>
      <div className="w-full flex fixed bottom-0 bg-purple-600 p-4 text-white flex justify-center cursor-pointer" onClick={logoutAuthUser}>
        <div>Logout</div>
      </div>
    </div>
  );
};
