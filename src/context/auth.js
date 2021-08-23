import { createContext, useState, useEffect } from "react";

import { getLoggedInUser } from "../data/db";

export const AuthContext = createContext();

export const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [canAuthenticate, setCanAuthenticate] = useState(false);

  const setLoggedInUser = () => {
    const user = getLoggedInUser();
    setUser(user);
  };

  useEffect(() => {
    setLoggedInUser();
  }, []);

  return (
      <AuthContext.Provider value={{ user: [user, setUser], canAuthenticate: [canAuthenticate, setCanAuthenticate]}}>
        {children}
      </AuthContext.Provider>
  );
};
