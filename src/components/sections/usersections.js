import { Link } from 'react-router-dom';
import profile from "../../assets/profile.png";

export const UnAuthenticatedUser = ({ invert }) => {
  return (
    <div>
      <div className="hidden md:flex items-center p-2">
        <div
          className="flex space-x-2 p-2 items-center border border-red-400 rounded mr-6 cursor-pointer"
          onClick={invert}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="text-white">SIGN IN</div>
        </div>
      </div>
      <div
        className="flex items-center p-2 mr-3 cursor-pointer md:hidden"
        onClick={invert}
      >
        <div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AuthenticatedUser = () => {

  return (
    <Link to="/profile">
    <div
      className="flex items-center p-2 mr-3 cursor-pointer"
    >
      <div>
        <div>
          <img src={profile} className="w-12 " alt="" />
        </div>
      </div>
    </div>
    </Link>
  );
};
