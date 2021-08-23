import { useContext } from 'react';

import { HomeNav } from '../navigation/homeNav.js';
import { TrendingNav } from '../navigation/trendingNav.js';
import { ProfileNav } from '../navigation/profileNav.js';
import { AuthContext } from "../../context/auth";

export const LeftNav = () => {
  
  const { user } = useContext(AuthContext);
  const [userValue] = user;

  return (
    <div className="flex flex-col space-y-4 p-5 border-r border-gray-700 h-full">
      <div className="pb-8 px-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
      <HomeNav/>
      <TrendingNav/>
      {userValue && <ProfileNav/>}
      
    </div>
  );
};
