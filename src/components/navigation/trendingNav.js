import { Link, useLocation } from "react-router-dom";

export const TrendingNav = () => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  return (
    <Link to="/trending">
      <div
        className={
          splitLocation[1] === "trending"
            ? "p-4 rounded cursor-pointer transition-colors"
            : "p-4 hover:bg-red-400 rounded cursor-pointer transition-colors"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={
            splitLocation[1] === "trending"
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
            d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
          />
        </svg>
      </div>
    </Link>
  );
};
