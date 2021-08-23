import { useState } from "react";

import { InputError } from "../../components/utils/errors";
import { ButtonLoader } from "../../components/utils/loader";
import { createUser, authUser } from "../../data/db";

import perform from "../../assets/perform.png";
import music from "../../assets/music.png";

const inputValid = (str) => {
  return str || /^\s*$/.test(str);
};

const passwordMatch = (str, str2) => {
  return str.trim() === str2.trim();
};

export const Login = ({
  canAuthenticateValue,
  setCanAuthenticate,
  setUser,
  signUp,
  setSignUp,
}) => {
  const initialState = {
    email: "",
    password: "",
    isLoading: false,
    hasError: false,
  };

  const [{ email, password, isLoading, hasError }, setState] =
    useState(initialState);

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, ["isLoading"]: true }));
    if (!inputValid(email) || !inputValid(password)) {
      setState((prevState) => ({
        ...prevState,
        ["isLoading"]: false,
        ["hasError"]: true,
      }));

    } else {
      setState((prevState) => ({
        ...prevState,
        ["isLoading"]: true,
        ["hasError"]: false,
      }));
      setTimeout(() => {
        const user = authUser({
          email: email,
          password: password,
        });
        if (user){
          setUser(user);
        }else{
          setState((prevState) => ({
            ...prevState,
            ["isLoading"]: false,
            ["hasError"]: true,
          }));
        }
                
      }, 3000);
    }
  };

  const switchSignUp = () => {
    setSignUp(!signUp);
  };
  return (
    <div
      className="fixed w-full inset-0 z-50 overflow-hidden flex justify-center items-end md:items-center animated fadeIn faster"
      style={{ background: "rgba(0,0,0,.7)" }}
    >
      <div className="border border-red-400 shadow-lg modal-container bg-white w-full  md:w-3/5 md:max-w-11/12 mx-auto rounded-t-lg md:rounded-lg shadow-lg z-50 overflow-y-auto max-h-full">
        <div className="modal-content text-left">
          <div className="flex justify-between">
            <div className="hidden md:flex items-center w-full h-auto bg-purple-50">
              <img src={perform} />
            </div>
            <div className="w-full">
              <div className="flex justify-end p-5 pb-3">
                <svg
                  onClick={() => {
                    setCanAuthenticate(!canAuthenticateValue);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 cursor-pointer"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="w-full flex justify-center">
                <div className="w-3/4 flex flex-col ">
                  <div className="text-3xl font-bold text-gray-700">
                    Discover more of Sauti
                  </div>
                  <div className="py-4 pb-8">
                    <form onSubmit={handleSubmit}>
                      <div className="flex flex-col space-y-4">
                        {hasError && <InputError />}
                        <div>
                          <label for="email" className="text-sm font-semibold">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            className="w-full rounded-md border focus:outline-none focus:ring-0 focus:border-red-400"
                            placeholder="grishon@example.com"
                            required
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label
                            for="password"
                            className="text-sm font-semibold"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            className="w-full rounded-md border focus:outline-none focus:ring-0 focus:border-red-400"
                            placeholder="strong password"
                            required
                            onChange={handleChange}
                          />
                        </div>
                        <div className="w-full flex justify-center pt-2">
                          <div className="w-full">
                            <button
                              type="submit"
                              id="sign-in"
                              className={`bg-red-400 w-full text-white py-3 rounded-md font-semibold focus:outline-none ${
                                isLoading
                                  ? "cursor-not-allowed"
                                  : "cursor-pointer"
                              }`}
                            >
                              {isLoading ? <ButtonLoader /> : "Sign In"}
                            </button>
                          </div>
                        </div>
                        <div className="text-sm">
                          New to Sauti?{" "}
                          <span
                            className="text-purple-600 hover:textpurple-700 cursor-pointer"
                            onClick={switchSignUp}
                          >
                            Sign Up
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Signup = ({
  canAuthenticateValue,
  setCanAuthenticate,
  setUser,
  signUp,
  setSignUp,
}) => {
  const initialState = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    isLoading: false,
    hasError: false,
  };

  const [
    { name, email, password, confirmPassword, isLoading, hasError },
    setState,
  ] = useState(initialState);

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, ["isLoading"]: true }));
    if (
      !inputValid(name) ||
      !inputValid(email) ||
      !inputValid(password) ||
      !inputValid(confirmPassword) ||
      !passwordMatch(password, confirmPassword)
    ) {
      setState((prevState) => ({
        ...prevState,
        ["isLoading"]: false,
        ["hasError"]: true,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        ["isLoading"]: true,
        ["hasError"]: false,
      }));
      setTimeout(() => {
        const user = createUser({
          name: name,
          email: email,
          password: password,
        });
        setUser(user);
      }, 3000);
    }
  };

  const switchSignUp = () => {
    setSignUp(!signUp);
  };
  return (
    <div
      className="fixed w-full inset-0 z-50 overflow-hidden flex justify-center items-end md:items-center animated fadeIn faster"
      style={{ background: "rgba(0,0,0,.7)" }}
    >
      <div className="border border-red-400 shadow-lg modal-container bg-white w-full  md:w-3/5 md:max-w-11/12 mx-auto rounded-t-lg md:rounded-lg shadow-lg z-50 overflow-y-auto max-h-full">
        <div className="modal-content text-left">
          <div className="flex justify-between">
            <div className="hidden md:flex items-center w-full h-auto bg-purple-50">
              <img src={music} />
            </div>
            <div className="w-full">
              <div className="flex justify-end p-5 pb-3">
                <svg
                  onClick={() => {
                    setCanAuthenticate(!canAuthenticateValue);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 cursor-pointer"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="w-full flex justify-center">
                <div className="w-3/4 flex flex-col ">
                  <div className="text-3xl font-bold text-gray-700">
                    Welcome to Sauti
                  </div>
                  <div className="py-4 pb-8">
                    <form onSubmit={handleSubmit}>
                      <div className="flex flex-col space-y-4">
                        {hasError && <InputError />}
                        <div>
                          <label for="name" className="text-sm font-semibold">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="w-full rounded-md border focus:outline-none focus:ring-0 focus:border-red-400"
                            placeholder="Grishon Ng'ang'a"
                            required
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label for="email" className="text-sm font-semibold">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            className="w-full rounded-md border focus:outline-none focus:ring-0 focus:border-red-400"
                            placeholder="grishon@example.com"
                            required
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label
                            for="password"
                            className="text-sm font-semibold"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            className="w-full rounded-md border focus:outline-none focus:ring-0 focus:border-red-400"
                            required
                            placeholder="strong password"
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label
                            for="confirm-password"
                            className="text-sm font-semibold"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            name="confirmPassword"
                            className="w-full rounded-md border focus:outline-none focus:ring-0 focus:border-red-400"
                            required
                            placeholder="Re-enter password"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="w-full flex justify-center pt-2">
                          <div className="w-full">
                            <button
                              type="submit"
                              id="sign-in"
                              className={`bg-red-400 w-full text-white py-3 rounded-md font-semibold focus:outline-none ${
                                isLoading
                                  ? "cursor-not-allowed"
                                  : "cursor-pointer"
                              }`}
                            >
                              {isLoading ? <ButtonLoader /> : "Sign up"}
                            </button>
                          </div>
                        </div>
                        <div className="text-sm">
                          Already have an Account?{" "}
                          <span
                            className="text-purple-600 hover:textpurple-700 cursor-pointer"
                            onClick={switchSignUp}
                          >
                            Sign In
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
