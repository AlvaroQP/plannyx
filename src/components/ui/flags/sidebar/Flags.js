import React from "react";
import { useTranslation } from "react-i18next";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import changeLanguage from "../../../../utils/changeLanguage";
import { useLanguage } from "../../../../context/language/LanguageProvider";
import Tooltip from "@mui/material/Tooltip";
import styles from "./Flags.module.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

export default function Flags({ collapsed }) {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  function handleLanguageChange(event) {
    setLanguage(event.target.value);
    changeLanguage(event.target.value);
  }

  const languageMenu = (
    <FormControl sx={{ width: "100%" }}>
      <Select
        className={styles.select}
        value={language}
        onChange={handleLanguageChange}
        IconComponent={() => null}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        sx={{
          pl: 1.75,

          border: "none",
          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
        }}
      >
        <MenuItem value="en-gb" sx={{ padding: ".75rem 1rem" }}>
          <span className={`fi fi-gb ${styles.flag}`} />{" "}
          {t("user-panel-sidebar.english")}
        </MenuItem>
        <MenuItem value="es" sx={{ padding: ".75rem 1rem" }}>
          <span className={`fi fi-es ${styles.flag}`} />{" "}
          {t("user-panel-sidebar.spanish")}
        </MenuItem>
      </Select>
    </FormControl>
  );

  const collapsedLanguageMenu = (
    <Tooltip title={t("user-panel-sidebar.language")} placement="right">
      <FormControl>
        <Select
          className={styles.select}
          value={language}
          onChange={handleLanguageChange}
          IconComponent={() => null}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            width: "100%",
            paddingLeft: ".80rem",
          }}
          renderValue={(value) => (
            <span
              className={`fi fi-${
                value.split("-")[1] ? value.split("-")[1] : value.split("-")[0]
              } ${styles.flag}`}
            />
          )}
        >
          <MenuItem value="en-gb">
            <span
              className={`fi fi-gb ${styles.flag} ${styles["flag-collapsed"]}`}
            />
            <span className={styles["flag-collapsed-text"]}>
              {t("user-panel-sidebar.english")}
            </span>
          </MenuItem>
          <MenuItem value="es">
            <span
              className={`fi fi-es ${styles.flag} ${styles["flag-collapsed"]}`}
            />
            <span className={styles["flag-collapsed-text"]}>
              {t("user-panel-sidebar.spanish")}
            </span>
          </MenuItem>
        </Select>
      </FormControl>
    </Tooltip>
  );

  return collapsed ? collapsedLanguageMenu : languageMenu;
}
