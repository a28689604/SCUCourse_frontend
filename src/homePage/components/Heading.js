import React from "react";

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          props: {
            variant: "h1",
          },
          style: {
            fontWeight: "bold",
          },
        },
      ],
    },
  },
});
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
  return (
    <Stack spacing={3} direction="column" justifyContent="center" alignItems="center" sx={{ maxWidth: "750px", marginTop: "20px" }}>
      <ThemeProvider theme={theme}>
        <Typography variant="h1" component="h1">
          <strong>東吳教授評價</strong>
        </Typography>
        <Typography variant="h5" component="p" sx={{ textAlign: "center" }}>
          「東吳教授評價」是一個東吳大學的教授評價網站，提供了一個平台讓學生能夠發表有關於教授的評價，以及查閱教授過去授課的成績分布，讓學生能夠更明確的了解教授的教學難度。此網站誕生的目的是為了提供學生一個更公正的評價系統，讓學生能夠更好的選擇課程。
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
