import { useEffect, useContext, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { AuthContext } from "./context/auth";
import { LeftNav } from "./components/sections/leftsection";
import { MidSection } from "./components/sections/midsection";
import { Login, Signup } from "./components/auth/";

import "./App.css";
import "./modal.css";

function App() {
  const { user, canAuthenticate } = useContext(AuthContext);
  const [userValue, setUser] = user;
  const [canAuthenticateValue, setCanAuthenticate] = canAuthenticate;
  const [signUp, setSignUp] = useState(false);

  useEffect(() => {});
  return (
    <div>
      <div className="w-screen h-screen bg-gray-900 p-4 pb-0">
        <div className="bg-black rounded-xl rounded-b-none shadow-xl flex h-full w-full overflow-y-scroll no-scrollbar">
          <BrowserRouter>
            <LeftNav />
            <MidSection />
          </BrowserRouter>
        </div>
      </div>
      {!userValue &&
        canAuthenticateValue &&
        (signUp ? (
          <Signup
            canAuthenticateValue={canAuthenticateValue}
            setCanAuthenticate={setCanAuthenticate}
            user={userValue}
            setUser={setUser}
            signUp={signUp}
            setSignUp={setSignUp}
          />
        ) : (
          <Login
            canAuthenticateValue={canAuthenticateValue}
            setCanAuthenticate={setCanAuthenticate}
            user={userValue}
            setUser={setUser}
            signUp={signUp}
            setSignUp={setSignUp}
          />
        ))}
    </div>
  );
}

export default App;
