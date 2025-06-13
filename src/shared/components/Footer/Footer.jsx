import GitHubIcon from "@mui/icons-material/GitHub";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
const Footer = () => {
  return (
    <Grid
      container
      sx={{
        width: "100%",
        backgroundColor: "primary.dark",
        padding: "0.5rem 2.4rem",
      }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid item>
        <Typography
          variant="h5"
          component="h1"
          sx={{
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Created By a28689604
        </Typography>
      </Grid>
      <Grid item>
        <Link
          href="https://github.com/a28689604/SCUCourse_frontend"
          color="inherit"
        >
          <GitHubIcon sx={{ fontSize: 25, color: "#fff" }} />
        </Link>
      </Grid>
    </Grid>
  );
};
export default Footer;
