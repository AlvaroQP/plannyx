import React from "react";
import changeLanguage from "../../../../utils/changeLanguage";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useLanguage } from "../../../../context/language/LanguageProvider";
import styles from "./Flags.module.css";

export default function Flags() {
  const { language, setLanguage } = useLanguage();

  function handleLanguageChange(event) {
    setLanguage(event.target.value);
    changeLanguage(event.target.value);
  }

  return (
    <Select
      value={language}
      onChange={handleLanguageChange}
      className={styles["flag-container"]}
      IconComponent={() => null}
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        color: "#fff",
      }}
    >
      <MenuItem value="en">
        <span className={`fi fi-gb ${styles.flag}`} />
        <span className={styles["flag-text"]}>EN</span>
      </MenuItem>
      <MenuItem value="es">
        <span className={`fi fi-es ${styles.flag}`} />
        <span className={styles["flag-text"]}>ES</span>
      </MenuItem>
    </Select>
  );
}
