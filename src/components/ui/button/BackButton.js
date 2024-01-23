import Button from "@mui/material/Button";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function BackButton(props) {
  const { t } = useTranslation();
  const { path } = props;
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      color="primary"
      startIcon={<ArrowBackOutlinedIcon />}
      sx={{ m: "0 0.5rem", width: "min-content" }}
      onClick={() => navigate(path)}
    >
      {t("button.back")}
    </Button>
  );
}
