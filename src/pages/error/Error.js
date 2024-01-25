import ResponsiveAppBar from "../../components/ui/appbar/ResponsiveAppBar";
import { useRouteError } from "react-router-dom";
import CustomButton from "../../components/ui/button/CustomButton";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Error.module.css";

export default function Error() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const error = useRouteError();
  let title;
  let errorMessage;

  if (error.status === 404) {
    title = t("404.title");
    errorMessage = t("404.message");
  }

  if (error.status === 500) {
    title = t("500.title");
    errorMessage = error.data.message;
  }

  return (
    <>
      <ResponsiveAppBar />
      <div className={styles["not-found-container"]}>
        <h1> {title} </h1>
        <p> {errorMessage} </p>
        <br />
        <CustomButton
          text={t("button.home")}
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        />
      </div>
    </>
  );
}
