import { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import { AuthContext } from "../../context/auth";
import {
  UnAuthenticatedUser,
  AuthenticatedUser,
} from "../sections/usersections.js";

export const TopNav = () => {
  const { user, canAuthenticate } = useContext(AuthContext);
  const [userValue] = user;
  const [canAuthenticateValue, setCanAuthenticate] = canAuthenticate;

  const invert = () => {
    setCanAuthenticate(!canAuthenticateValue);
  };
  return (
    <div>
      <div className="flex items-center justify-between w-full border-b border-gray-700 fixed bg-black md:pl-24 z-40">
        <div className="p-4 px-6">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-24" />
            </Link>
        </div>
        {userValue ? (
          <AuthenticatedUser />
        ) : (
          <UnAuthenticatedUser invert={invert} />
        )}
      </div>
     
    </div>
  );
};
