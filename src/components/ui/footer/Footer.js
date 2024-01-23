import React from "react";
import logo from "../../../assets/images/logo.png";
import getYear from "../../../utils/getYear";
import { useTranslation } from "react-i18next";
import styles from "./Footer.module.css";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <div className={styles["footer-container"]}>
      <div className={styles["footer-logo-container"]}>
        <img src={logo} alt="logo" className={styles["footer-logo"]} />
        <div className={styles["copyright-container"]}>
          <p>
            © {getYear()} Plannyx. {t("footer.all-rights-reserved")}
          </p>
          <p>{t("footer.developed-by")}</p>
        </div>
      </div>
    </div>
  );
}
