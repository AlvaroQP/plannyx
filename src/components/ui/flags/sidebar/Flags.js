import React from "react";
import { useTranslation } from "react-i18next";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import LanguageIcon from "@mui/icons-material/Language";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import changeLanguage from "../../../../utils/changeLanguage";
import { useLanguage } from "../../../../context/language/LanguageProvider";
import Tooltip from "@mui/material/Tooltip";
import styles from "./Flags.module.css";

export default function Flags({ collapsed }) {
  const { t } = useTranslation();
  const { setLanguage } = useLanguage();

  function handleLanguageChange(language) {
    setLanguage(language);
    changeLanguage(language);
  }

  const languageMenu = (
    <SubMenu
      label={t("user-panel-sidebar.language")}
      icon={<LanguageIcon className={styles.icon} />}
    >
      <MenuItem onClick={() => handleLanguageChange("en")}>
        <span className={`fi fi-gb ${styles.flag}`} />{" "}
        {t("user-panel-sidebar.english")}
      </MenuItem>
      <MenuItem onClick={() => handleLanguageChange("es")}>
        <span className={`fi fi-es ${styles.flag}`} />{" "}
        {t("user-panel-sidebar.spanish")}
      </MenuItem>
    </SubMenu>
  );

  return collapsed ? (
    <Tooltip title={t("user-panel-sidebar.language")} placement="right">
      <div>{languageMenu}</div>
    </Tooltip>
  ) : (
    languageMenu
  );
}
