import React from "react";
import bannerEn from "../../assets/images/banner-en.png";
import bannerEs from "../../assets/images/banner-es.png";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import styles from "./Home.module.css";

export default function Home() {
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

      <div className={styles["welcome-message-container"]}>
        {t("welcome-message")}
      </div>
    </>
  );
}
