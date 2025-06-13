import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { getAnalytics, logEvent } from "firebase/analytics";
import React, { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: "auto",
  paddingRight: "2.5px",
  marginLeft: theme.spacing(1),
  width: "auto",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100px",
    "&:focus": {
      width: "150px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0.5, 0.5, 0.5, 1),
      "&:focus": {
        width: "100px",
      },
    },
  },
}));

const MainNavigation = props => {
  // GA stuff
  const analytics = getAnalytics();
  logEvent(analytics, "search");

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
    <Box className="flex-grow">
      <AppBar position="static">
        <Toolbar className="flex justify-between">
          <IconButton
            color="inherit"
            className="min-h-0 min-w-0 p-0"
            onClick={() => history.push("/")}
          >
            <HomeIcon className="text-white" fontSize="large" />
          </IconButton>
          <Search>
            <Box
              component="form"
              onSubmit={searchHandler}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <StyledInputBase
                placeholder="搜尋教授..."
                inputProps={{ "aria-label": "search", style: { fontSize: 16 } }}
                inputRef={searchInputRef}
              />
              <IconButton
                type="submit"
                className="text-white"
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </Search>
          {!auth.isLoggedIn && (
            <IconButton
              color="inherit"
              className="min-h-0 min-w-0 p-0"
              onClick={() => history.push("/auth")}
            >
              <LoginIcon className="text-white" fontSize="large" />
            </IconButton>
          )}
          {auth.isLoggedIn && (
            <IconButton
              color="inherit"
              className="min-h-0 min-w-0 p-0"
              onClick={() => auth.logout()}
            >
              <LogoutIcon
                className="text-white"
                fontSize="large"
                onClick={auth.logout}
              />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainNavigation;
