import Divider from "@mui/material/Divider";

export default function CustomDivider() {
  return (
    <Divider
      sx={{
        width: "100%",
        border: ".5px solid lightgrey",
        mb: 2,
        boxSizing: "border-box",
      }}
    />
  );
}
