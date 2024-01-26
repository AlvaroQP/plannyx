import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/ui/button/CustomButton";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

export default function AccessDenied() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: 10,
      }}
    >
      <h1>{t("access-denied.title")}</h1>
      <p>{t("access-denied.message")}</p>
      <CustomButton
        variant="contained"
        text={t("button.home")}
        color="primary"
        size="large"
        onClick={() => navigate("/")}
      />
    </Box>
  );
}
