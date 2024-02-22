import React from "react";
import styles from "./RemindersContainer.module.css";
import UserPanelHeader from "../../../../components/ui/header/user-panel-header/UserPanelHeader";
import { useTranslation } from "react-i18next";
import { useReminders } from "../../../../context/reminders/RemindersProvider";
import NewReminder from "../new-reminder/NewReminder";
import CustomScrollableTabs from "../../../../components/ui/tabs/CustomScrollableTabs";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SchoolIcon from "@mui/icons-material/School";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlightIcon from "@mui/icons-material/Flight";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import CasinoIcon from "@mui/icons-material/Casino";
import RemindersContent from "../reminders-content/RemindersContent";

export default function RemindersContainer() {
  const { t } = useTranslation();
  const { reminders } = useReminders();
  const categoryOrder = [
    "personal",
    "work",
    "health",
    "finance",
    "education",
    "shopping",
    "sports",
    "entertainment",
    "travel",
    "family",
  ];
  const categoriesInReminders = new Set(
    reminders.map((reminder) => reminder.category)
  );
  const categories = categoryOrder.filter((category) =>
    categoriesInReminders.has(category)
  );
  const categoryIcons = {
    work: <WorkIcon sx={{ fontSize: "1.2rem", color: "#a96730" }} />,
    personal: <PersonIcon sx={{ fontSize: "1.2rem", color: "#1970c2" }} />,
    health: <LocalHospitalIcon sx={{ fontSize: "1.2rem", color: "#cd2121" }} />,
    education: <SchoolIcon sx={{ fontSize: "1.2rem", color: "#55853a" }} />,
    finance: (
      <AccountBalanceIcon sx={{ fontSize: "1.2rem", color: "#b5960a" }} />
    ),
    shopping: (
      <ShoppingCartIcon sx={{ fontSize: "1.2rem", color: "#d4634f" }} />
    ),
    travel: <FlightIcon sx={{ fontSize: "1.2rem", color: "#4f4fc4" }} />,
    family: (
      <FamilyRestroomIcon sx={{ fontSize: "1.2rem", color: "#9b6b5b" }} />
    ),
    sports: <SportsSoccerIcon sx={{ fontSize: "1.2rem", color: "#4f6b93" }} />,
    entertainment: <CasinoIcon sx={{ fontSize: "1.2rem", color: "#c42256" }} />,
  };

  return (
    <>
      <UserPanelHeader title={t("user-panel-sidebar.to-do-list")} />

      <div className={styles["reminders-container"]}>
        <CustomScrollableTabs
          initialTabId={1}
          tabs={[
            {
              id: 1,
              name: (
                <div className={styles["new-reminder-div"]}>
                  {t("reminders.new-reminder")}
                </div>
              ),
              content: <NewReminder />,
            },
            ...categories.map((category, index) => ({
              id: index + 2,
              name: (
                <div className={styles["category-tab-name-container"]}>
                  {categoryIcons[category]}
                  {t(`reminders.category-${category}`)}
                </div>
              ),
              content: (
                <RemindersContent
                  reminders={reminders.filter(
                    (reminder) => reminder.category === category
                  )}
                />
              ),
            })),
          ]}
        />
      </div>
    </>
  );
}
