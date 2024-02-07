import React from "react";
import bannerEn from "../../assets/images/banner-en.png";
import bannerEs from "../../assets/images/banner-es.png";
import homeBanner1 from "../../assets/images/home-banner-1.png";
import homeBanner2 from "../../assets/images/home-banner-2.png";
import { useTranslation } from "react-i18next";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Footer from "../../components/ui/footer/Footer";
import { useLanguage } from "../../context/language/LanguageProvider";
import styles from "./Home.module.css";

export default function Home() {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <>
      <div className={styles["banner-container"]}>
        <img
          src={language === "en-gb" ? bannerEn : bannerEs}
          alt="banner"
          className={styles.banner}
        />
      </div>

      <div className={styles["message-container"]}>
        <p>{t("home.welcome-message.p1")}</p>
        <p>{t("home.welcome-message.p2")}</p>
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

      <Footer />
    </>
  );
}
