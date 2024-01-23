import React from "react";
import bannerEn from "../../assets/images/banner-en.png";
import bannerEs from "../../assets/images/banner-es.png";
import homeBanner1 from "../../assets/images/home-banner-1.png";
import homeBanner2 from "../../assets/images/home-banner-2.png";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useAuth } from "../../auth/auth-context/AuthProvider";
import CustomButton from "../../components/ui/button/CustomButton";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import styles from "./Home.module.css";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <div className={styles["banner-container"]}>
        <img
          src={i18n.language === "en" ? bannerEn : bannerEs}
          alt="banner"
          className={styles.banner}
        />
      </div>

      <div className={styles["message-container"]}>
        <p>{t("home.welcome-message.p1")}</p>
        <p>{t("home.welcome-message.p2")}</p>

        {!user && (
          <div className={styles["login-signup-container"]}>
            <CustomButton
              text={t("button.login")}
              variant="contained"
              color="primary"
              onClick={() => navigate("/login")}
            />
            <CustomButton
              text={t("button.sign-up")}
              variant="contained"
              color="success"
              onClick={() => navigate("/signup")}
            />
          </div>
        )}
      </div>

      <div>
        <img src={homeBanner1} alt="banner" className={styles.banner} />
      </div>

      <div className={styles["message-container-benefits"]}>
        <h2>{t("home.why-use-plannyx")}</h2>
        <div className={styles["benefits-ul-container"]}>
          <ul>
            <li>
              <CheckCircleOutlineIcon /> {t("home.benefits.1")}
            </li>
            <li>
              <CheckCircleOutlineIcon /> {t("home.benefits.2")}
            </li>
            <li>
              <CheckCircleOutlineIcon /> {t("home.benefits.3")}
            </li>
          </ul>
          <ul>
            <li>
              <CheckCircleOutlineIcon /> {t("home.benefits.4")}
            </li>
            <li>
              <CheckCircleOutlineIcon /> {t("home.benefits.5")}
            </li>
            <li>
              <CheckCircleOutlineIcon /> {t("home.benefits.6")}
            </li>
          </ul>
        </div>
      </div>

      <div>
        <img src={homeBanner2} alt="banner" className={styles.banner} />
      </div>
    </>
  );
}
