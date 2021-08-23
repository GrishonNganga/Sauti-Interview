import { Link, useLocation } from "react-router-dom";

export const HomeNav = () => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  return (
    <Link to="/">
      <div
        className={
          splitLocation[1] === ""
            ? "p-4 text-red-400"
            : "p-4 hover:bg-red-400 rounded cursor-pointer transition-colors"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={
            splitLocation[1] === ""
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>
    </Link>
  );
};
