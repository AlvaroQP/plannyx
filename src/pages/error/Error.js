import { useRouteError } from "react-router-dom";
import CustomButton from "../../components/ui/button/CustomButton";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../auth/auth-context/AuthProvider";
import styles from "./Error.module.css";

export default function Error() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLoggedIn } = useAuth();

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
    <div className={styles["not-found-container"]}>
      <h1> {title} </h1>
      <p> {errorMessage} </p>
      <br />
      <CustomButton
        text={t("button.back")}
        variant="contained"
        color="primary"
        onClick={() => navigate(isLoggedIn ? "user-panel" : "/")}
      />
    </div>
  );
}
