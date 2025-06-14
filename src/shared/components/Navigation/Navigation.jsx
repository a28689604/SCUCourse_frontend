import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

const MainNavigation = () => {
  const auth = useContext(AuthContext);

  const searchInputRef = useRef();
  const history = useHistory();

  const searchHandler = event => {
    event.preventDefault();
    const enteredTeacher = searchInputRef.current.value;
    if (enteredTeacher) {
      history.push({
        pathname: `/teacher/find/${enteredTeacher}`,
      });
    }
    searchInputRef.current.value = "";
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-lg backdrop-blur-sm">
      <div className="flex h-18 w-full items-center justify-between gap-6 px-4">
        {/* Logo/Home Button */}
        <div className="flex-shrink-0">
          <button
            onClick={() => history.push("/")}
            className="group flex items-center justify-center rounded-xl border border-white/20 bg-white/10 p-3 shadow-lg backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:bg-white/20 hover:shadow-xl"
            aria-label="返回首頁"
          >
            <HomeIcon
              className="text-white transition-colors duration-200 group-hover:text-blue-100"
              fontSize="large"
            />
          </button>
        </div>

        {/* Search Bar */}
        <div className="mx-auto max-w-4xl flex-1">
          <form onSubmit={searchHandler} className="group relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-5">
              <SearchIcon className="h-6 w-6 text-white/70 transition-colors duration-200 group-focus-within:text-white/90" />
            </div>

            <input
              id="search-input"
              ref={searchInputRef}
              type="text"
              placeholder="搜尋教授..."
              className="w-full rounded-2xl border border-white/20 bg-white/10 py-4 pr-16 pl-14 text-lg font-medium text-white placeholder-white/70 shadow-inner backdrop-blur-md transition-all duration-300 ease-out hover:border-white/30 hover:bg-white/15 hover:shadow-lg focus:border-white/40 focus:bg-white/20 focus:placeholder-white/50 focus:shadow-xl focus:ring-2 focus:ring-white/30 focus:outline-none"
              aria-label="搜尋教授"
            />

            <button
              type="submit"
              className="group/btn absolute inset-y-0 right-0 flex items-center pr-3"
              id="search-button"
              aria-label="搜尋"
            >
              <div className="rounded-xl border border-white/20 bg-white/10 p-3 shadow-sm transition-all duration-200 ease-out hover:scale-105 hover:border-white/30 hover:bg-white/20 hover:shadow-md active:scale-95">
                <SearchIcon className="h-5 w-5 text-white/80 transition-colors duration-200 group-hover/btn:text-white" />
              </div>
            </button>
          </form>
        </div>

        {/* Auth Buttons */}
        <div className="flex-shrink-0">
          {!auth.isLoggedIn ? (
            <button
              onClick={() => history.push("/auth")}
              className="group flex items-center space-x-3 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-white shadow-lg backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:bg-white/20 hover:text-blue-100 hover:shadow-xl"
              aria-label="登入"
            >
              <LoginIcon
                className="transition-transform duration-200 group-hover:scale-110"
                fontSize="medium"
              />
              <span className="text-base font-medium">登入</span>
            </button>
          ) : (
            <button
              onClick={auth.logout}
              className="group flex items-center space-x-3 rounded-xl border border-red-400/30 bg-red-500/20 px-6 py-3 text-white shadow-lg backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:bg-red-500/30 hover:text-red-100 hover:shadow-xl"
              aria-label="登出"
            >
              <LogoutIcon
                className="transition-transform duration-200 group-hover:scale-110"
                fontSize="medium"
              />
              <span className="text-base font-medium">登出</span>
            </button>
          )}
        </div>
      </div>
      {/* Subtle bottom border for depth */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </nav>
  );
};

export default MainNavigation;
