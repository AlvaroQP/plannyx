import Button from "@mui/material/Button";

export default function CustomButton(props) {
  const { text, variant, color, onClick, type, icon } = props;

  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      type={type}
      startIcon={icon}
    >
      {text}
    </Button>
  );
}
