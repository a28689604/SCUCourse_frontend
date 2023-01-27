import React, { useContext, useRef } from "react";
import { Link as RouterLink, NavLink as RouterNavLink, useHistory } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import MainHeader from "./MainHeader";

import classes from "./MainNavigation.module.css";
import Login from "../Icons/Login";
import Logout from "../Icons/Logout";
// import Search from "../Icons/Search";

import { getAnalytics, logEvent } from "firebase/analytics";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: "auto",
  paddingRight: "2.5px",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "100px",
      "&:focus": {
        width: "150px",
      },
    },
  },
}));

const MainNavigation = (props) => {
  // GA stuff
  const analytics = getAnalytics();
  logEvent(analytics, "search");

  const auth = useContext(AuthContext);

  const searchInputRef = useRef();
  const history = useHistory();

  const searchHandler = (event) => {
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
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link component={RouterNavLink} variant="h5" sx={{ textDecoration: "none", color: "#fff", marginRight: 2 }} to="/">
              東吳課程評價
            </Link>
            <Search>
              <Box component="form" onSubmit={searchHandler} sx={{ display: "flex", alignItems: "center" }}>
                <StyledInputBase placeholder="搜尋教授..." inputProps={{ "aria-label": "search", style: { fontSize: 16 } }} inputRef={searchInputRef} />
                <IconButton type="submit" sx={{ color: "#fff" }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Box>
            </Search>
            {!auth.isLoggedIn && (
              <Button color="inherit">
                <Link component={RouterNavLink} variant="h5" sx={{ textDecoration: "none", color: "#fff" }} to="/auth">
                  登入
                </Link>
              </Button>
            )}
            {auth.isLoggedIn && (
              <Button color="inherit">
                <Typography variant="h5" sx={{ color: "#fff" }} onClick={auth.logout}>
                  登出
                </Typography>
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default MainNavigation;
