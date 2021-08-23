import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export const ProfileNav = () => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const [pathToMatch] = useState("profile");
  return (
    <Link to="/profile">
      <div
        className={
          splitLocation[1] === pathToMatch
            ? "p-4 rounded cursor-pointer transition-colors"
            : "p-4 hover:bg-red-400 rounded cursor-pointer transition-colors"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={
            splitLocation[1] === pathToMatch
              ? "h-6 w-6 text-red-400"
              : "h-6 w-6 text-white"
          }
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>
    </Link>
  );
};
