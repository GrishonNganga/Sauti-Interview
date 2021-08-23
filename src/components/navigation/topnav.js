import { useContext } from "react";
import logo from "../../logo.svg";
import { AuthContext } from "../../context/auth";
import { UnAuthenticatedUser, AuthenticatedUser } from "../sections/usersections.js";

export const TopNav = () => {
  const { user, canAuthenticate } = useContext(AuthContext);
  const [userValue, setUser] = user;
  const [canAuthenticateValue, setCanAuthenticate] = canAuthenticate;

  const invert = () => {
    setCanAuthenticate(!canAuthenticateValue);
  };
  return (
    <div className="flex items-center justify-between w-full border-b border-gray-700">
      <div className="p-4 px-6">
        <img src={logo} alt="Logo" className="w-24" />
      </div>
      {userValue ? <AuthenticatedUser /> : <UnAuthenticatedUser invert={invert} />}
    </div>
  );
};
