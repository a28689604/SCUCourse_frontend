import React from 'react';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';

const theme = createTheme();

theme.typography.h1 = {
  fontWeight: 'bold',
  fontSize: '6rem',
  '@media (max-width:425px)': {
    fontSize: '4rem',
  },
};
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.dark,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
  paddingRight: '2.5px',

  marginLeft: theme.spacing(1),
  width: 'auto',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#fff',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    width: '100%',
  },
}));
const Heading = (props) => {
  const matches = useMediaQuery('(max-width:425px)');

  return (
    <Stack
      spacing={2.5}
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={
        matches
          ? { maxWidth: '615px', marginTop: '15px' }
          : { maxWidth: '615px', marginTop: '30px' }
      }
    >
      <ThemeProvider theme={theme}>
        <Typography
          variant="h5"
          component="p"
          sx={{ textAlign: 'center', marginBottom: '10px' }}
        >
          本站收錄了105學年至110學年第1學期之所有課程的成績分布。
          <br />
          自110學年第2學期開始之課程成績皆為同學自行上傳，不保證課程成績之正確性。
        </Typography>
      </ThemeProvider>
    </Stack>
  );
};

export default Heading;
