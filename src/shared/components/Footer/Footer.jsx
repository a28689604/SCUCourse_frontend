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
        padding: "1rem 2.4rem",
        minHeight: "60px",
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <Link
          href="https://github.com/a28689604"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "#fff",
            textDecoration: "none",
            "&:hover": {
              opacity: 0.8,
              textDecoration: "underline",
            },
          }}
        >
          <GitHubIcon sx={{ fontSize: 20 }} />
          <Typography
            variant="h6"
            component="span"
            sx={{
              fontWeight: "500",
              fontSize: "1rem",
            }}
          >
            Created by Eric Chen (@a28689604)
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
};

export default Footer;
