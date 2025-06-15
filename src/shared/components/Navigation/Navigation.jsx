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
      <div className="flex w-full items-center justify-between gap-2 px-2 py-2 sm:h-16 sm:gap-4 sm:px-3 md:h-18 md:gap-6 md:px-4">
        {/* Logo/Home Button */}
        <div className="flex h-full flex-shrink-0 items-center justify-center">
          <button
            onClick={() => history.push("/")}
            className="group flex h-full items-center justify-center rounded-lg border border-white/20 bg-white/10 p-2 shadow-lg backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:bg-white/20 hover:shadow-xl sm:rounded-xl sm:p-2.5 md:p-3"
            aria-label="返回首頁"
          >
            <HomeIcon
              className="text-white transition-colors duration-200 group-hover:text-blue-100"
              fontSize="medium"
              sx={{ fontSize: { xs: "1.5rem", sm: "1.5rem", md: "1.75rem" } }}
            />
          </button>
        </div>

        {/* Search Bar */}
        <div className="mx-auto h-full max-w-4xl flex-1">
          <form
            onSubmit={searchHandler}
            className="group relative h-full w-full"
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex h-full items-center pl-3 sm:pl-4 md:pl-5">
              <SearchIcon className="h-4 w-4 text-white/70 transition-colors duration-200 group-focus-within:text-white/90 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </div>

            <input
              id="search-input"
              ref={searchInputRef}
              type="text"
              placeholder="搜尋教授..."
              className="h-full w-full rounded-xl border border-white/20 bg-white/10 py-2.5 pr-12 pl-10 text-sm font-medium text-white placeholder-white/70 shadow-inner backdrop-blur-md transition-all duration-300 ease-out hover:border-white/30 hover:bg-white/15 hover:shadow-lg focus:border-white/40 focus:bg-white/20 focus:placeholder-white/50 focus:shadow-xl focus:ring-2 focus:ring-white/30 focus:outline-none sm:rounded-2xl sm:py-3 sm:pr-14 sm:pl-12 sm:text-base md:py-4 md:pr-16 md:pl-14 md:text-lg"
              aria-label="搜尋教授"
            />

            <button
              type="submit"
              className="group/btn absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-2.5 md:pr-3"
              id="search-button"
              aria-label="搜尋"
            >
              <div className="rounded-lg border border-white/20 bg-white/10 p-1 shadow-sm transition-all duration-200 ease-out hover:scale-105 hover:border-white/30 hover:bg-white/20 hover:shadow-md active:scale-95 sm:rounded-xl sm:p-1.5 md:p-2">
                <SearchIcon className="text-sm text-white/80 transition-colors duration-200 group-hover/btn:text-white sm:text-base md:text-lg" />
              </div>
            </button>
          </form>
        </div>

        {/* Auth Buttons */}
        <div className="flex h-full flex-shrink-0 items-center justify-center">
          {!auth.isLoggedIn ? (
            <button
              onClick={() => history.push("/auth")}
              className="group flex h-full items-center rounded-lg border border-white/20 bg-white/10 p-2 text-white shadow-lg backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:bg-white/20 hover:text-blue-100 hover:shadow-xl sm:space-x-3 sm:rounded-xl sm:p-2.5 md:p-3"
              aria-label="登入"
            >
              <LoginIcon
                className="transition-transform duration-200 group-hover:scale-110"
                sx={{
                  fontSize: { xs: "1.5rem", sm: "1.5rem", md: "1.75rem" },
                }}
              />
              <span className="hidden text-xs font-medium sm:block sm:text-sm md:text-base">
                登入
              </span>
            </button>
          ) : (
            <button
              onClick={auth.logout}
              className="group flex h-full items-center rounded-lg border border-red-400/30 bg-red-500/20 p-2 text-white shadow-lg backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:bg-red-500/30 hover:text-red-100 hover:shadow-xl sm:space-x-3 sm:rounded-xl sm:p-2.5 md:p-3"
              aria-label="登出"
            >
              <LogoutIcon
                className="transition-transform duration-200 group-hover:scale-110"
                sx={{
                  fontSize: { xs: "1.5rem", sm: "1.5rem", md: "1.75rem" },
                }}
              />
              <span className="hidden text-xs font-medium sm:block sm:text-sm md:text-base">
                登出
              </span>
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
