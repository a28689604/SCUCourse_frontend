import { Backdrop } from "@mui/material";

const CustomBackdrop = props => {
  return (
    <Backdrop
      open={true}
      onClick={props.onClick}
      sx={{
        zIndex: 1250,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    />
  );
};

export default CustomBackdrop;
