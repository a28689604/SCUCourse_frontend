import React from "react";

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";

const theme = createTheme();

theme.typography.h1 = {
  fontWeight: "bold",
  fontSize: "6rem",
  "@media (max-width:425px)": {
    fontSize: "4rem",
  },
};
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.dark,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
  paddingRight: "2.5px",

  marginLeft: theme.spacing(1),
  width: "auto",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#fff",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    width: "100%",
  },
}));
const Heading = (props) => {
  const matches = useMediaQuery("(max-width:425px)");

  return (
    <Stack
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={matches ? { maxWidth: "600px", marginTop: "15px" } : { maxWidth: "600px", marginTop: "30px" }}
    >
      <ThemeProvider theme={theme}>
        <Typography variant="h1" component="h1">
          東吳教授評價
        </Typography>
        <Typography variant="h5" component="p" sx={{ textAlign: "center" }}>
          「東吳教授評價」是一個旨在提供東吳大學學生更公正、透明的教授評價平台的網站。 <br />
          作為一個學生，你可能會對即將修課的教授有許多疑問，例如教學風格、課業難度、評分方式等等。透過「東吳教授評價」，你可以輕鬆地查詢到教授的歷年成績分布，了解其授課難度與評分標準。同時，你也可以發表對教授的評價，分享自己的課程經驗，並且幫助其他學生作出更好的選擇。
        </Typography>
        <Search>
          <Box component="form" onSubmit={props.searchHandler} sx={{ display: "flex", alignItems: "center" }}>
            <StyledInputBase placeholder="搜尋教授..." inputProps={{ "aria-label": "search", style: { fontSize: 16 } }} inputRef={props.searchInputRef} />
            <IconButton type="submit" sx={{ color: "#fff" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Box>
        </Search>
      </ThemeProvider>
    </Stack>
  );
};

export default Heading;
