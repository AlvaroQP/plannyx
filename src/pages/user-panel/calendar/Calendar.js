import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useProjects } from "../../../context/projects/ProjectsProvider";
import { useReminders } from "../../../context/reminders/RemindersProvider";
import UserPanelHeader from "../../../components/ui/header/user-panel-header/UserPanelHeader";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/language/LanguageProvider";
import styles from "./Calendar.module.css";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import CustomButton from "../../../components/ui/button/CustomButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CustomDivider from "../../../components/ui/divider/CustomDivider";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
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
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SignalCellular1BarIcon from "@mui/icons-material/SignalCellular1Bar";
import SignalCellular2BarIcon from "@mui/icons-material/SignalCellular2Bar";
import SignalCellular3BarIcon from "@mui/icons-material/SignalCellular3Bar";
import SignalCellularConnectedNoInternet4BarIcon from "@mui/icons-material/SignalCellularConnectedNoInternet4Bar";

export default function CalendarView() {
  const { projects } = useProjects();
  const { reminders } = useReminders();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const colors = [
    "#a8e6cf", // mint
    "#dcedc1", // cream
    "#ffd3b6", // peach
    "#ffaaa5", // light salmon
    "#d46f4d", // dark salmon
    "#ff8b94", // flamingo
    "#f6abb6", // blush
    "#ddb3c6", // lavender
    "#769fcd", // periwinkle
    "#a8d8ea", // powder blue
    "#b8e0d2", // tea green
    "#d6e0f0", // alice blue
    "#e8d0a9", // mellow apricot
    "#f6d6ad", // navajo white
  ];

  const projectEvents = projects.map((project, index) => {
    let endDate = project.endDate
      ? project.endDate.toDate()
      : project.startDate.toDate();
    if (project.endDate) {
      endDate.setDate(endDate.getDate() + 1);
    }
    return {
      title: project.name,
      start: project.startDate.toDate(),
      end: endDate,
      url: `/user-panel/projects/${project.id}`,
      allDay: true,
      backgroundColor: colors[index % colors.length],
      color: colors[index % colors.length],
      textColor: "black",
      type: "project",
    };
  });

  const reminderEvents = reminders.map((reminder, index) => {
    let date = reminder.date.toDate();
    let [hours, minutes] = reminder.time.split(":");
    let startDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes
    );
    return {
      title: reminder.title,
      start: startDate,
      time: reminder.time,
      category: reminder.category,
      priority: reminder.priority,
      notes: reminder.notes,
      backgroundColor: "#f20759",
      color: "#f20759",
      textColor: "black",
      type: "reminder",
    };
  });

  const allEvents = [...projectEvents, ...reminderEvents];

  /*   function handleEventClick(event) {
    if (event.type === "project") {
      navigate(event.url);
    }
  } */

  function handleEventMouseEnter(info) {
    info.el.style.border = ".5px solid black";
    info.el.style.fontWeight = "600";
  }

  function handleEventMouseLeave(info) {
    info.el.style.border = "none";
    info.el.style.fontWeight = "normal";
  }

  const categoryIcons = {
    work: (
      <WorkIcon sx={{ fontSize: "1.2rem", color: "#a96730", mr: ".25rem" }} />
    ),
    personal: (
      <PersonIcon sx={{ fontSize: "1.2rem", color: "#0f8ad7", mr: ".25rem" }} />
    ),
    health: (
      <LocalHospitalIcon
        sx={{ fontSize: "1.2rem", color: "#cd2121", mr: ".25rem" }}
      />
    ),
    education: (
      <SchoolIcon sx={{ fontSize: "1.2rem", color: "#55853a", mr: ".25rem" }} />
    ),
    finance: (
      <AccountBalanceIcon
        sx={{ fontSize: "1.2rem", color: "#b5960a", mr: ".25rem" }}
      />
    ),
    shopping: (
      <ShoppingCartIcon
        sx={{ fontSize: "1.2rem", color: "#d4634f", mr: ".25rem" }}
      />
    ),
    travel: (
      <FlightIcon sx={{ fontSize: "1.2rem", color: "#4f4fc4", mr: ".25rem" }} />
    ),
    family: (
      <FamilyRestroomIcon
        sx={{ fontSize: "1.2rem", color: "#9b6b5b", mr: ".25rem" }}
      />
    ),
    sports: (
      <SportsSoccerIcon
        sx={{ fontSize: "1.2rem", color: "#4f6b93", mr: ".25rem" }}
      />
    ),
    entertainment: (
      <CasinoIcon sx={{ fontSize: "1.2rem", color: "#c42256", mr: ".25rem" }} />
    ),
    other: (
      <MoreHorizIcon
        sx={{ fontSize: "1.2rem", color: "#4f4fc4", mr: ".25rem" }}
      />
    ),
  };

  const priorityIcons = {
    low: (
      <SignalCellular1BarIcon
        sx={{ fontSize: "1rem", color: "#029a02", mr: ".25rem" }}
      />
    ),
    medium: (
      <SignalCellular2BarIcon
        sx={{ fontSize: "1rem", color: "#ff6b02", mr: ".25rem" }}
      />
    ),
    high: (
      <SignalCellular3BarIcon
        sx={{ fontSize: "1rem", color: "#cd0303", mr: ".25rem" }}
      />
    ),
    critical: (
      <SignalCellularConnectedNoInternet4BarIcon
        sx={{ fontSize: "1rem", color: "#ff0000", mr: ".25rem" }}
      />
    ),
  };

  return (
    <>
      <UserPanelHeader title={t("user-panel-sidebar.calendar")} />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
          {selectedEvent?.title}
        </DialogTitle>
        <DialogContent>
          <CustomDivider />
          <div className={styles["date-and-time"]}>
            <div className={styles.date}>
              <CalendarMonthIcon
                sx={{ fontSize: "1.2rem", color: "#CD2121", mr: ".25rem" }}
              />
              {selectedEvent?.date}
            </div>
            <div className={styles.time}>
              <AccessTimeIcon
                sx={{ fontSize: "1.2rem", color: "#1970c2", mr: ".25rem" }}
              />
              {selectedEvent?.time}
            </div>
          </div>

          <div className={styles["category-and-priority"]}>
            <div className={styles.category}>
              {selectedEvent?.category === "personal" && (
                <>
                  {categoryIcons.personal}
                  {t("reminders.category-personal")}
                </>
              )}
              {selectedEvent?.category === "work" && (
                <>
                  {categoryIcons.work}
                  {t("reminders.category-work")}
                </>
              )}
              {selectedEvent?.category === "health" && (
                <>
                  {categoryIcons.health}
                  {t("reminders.category-health")}
                </>
              )}
              {selectedEvent?.category === "education" && (
                <>
                  {categoryIcons.education}
                  {t("reminders.category-education")}
                </>
              )}
              {selectedEvent?.category === "finance" && (
                <>
                  {categoryIcons.finance}
                  {t("reminders.category-finance")}
                </>
              )}
              {selectedEvent?.category === "shopping" && (
                <>
                  {categoryIcons.shopping}
                  {t("reminders.category-shopping")}
                </>
              )}
              {selectedEvent?.category === "family" && (
                <>
                  {categoryIcons.family}
                  {t("reminders.category-family")}
                </>
              )}
              {selectedEvent?.category === "sports" && (
                <>
                  {categoryIcons.sports}
                  {t("reminders.category-sports")}
                </>
              )}
              {selectedEvent?.category === "entertainment" && (
                <>
                  {categoryIcons.entertainment}
                  {t("reminders.category-entertainment")}
                </>
              )}
              {selectedEvent?.category === "travel" && (
                <>
                  {categoryIcons.travel}
                  {t("reminders.category-travel")}
                </>
              )}
              {selectedEvent?.category === "other" && (
                <>
                  {categoryIcons.other}
                  {t("reminders.category-other")}
                </>
              )}
            </div>

            <div className={styles.priority}>
              {selectedEvent?.priority === "low" && (
                <>
                  {priorityIcons.low}
                  {t("reminders.priority-low")}
                </>
              )}
              {selectedEvent?.priority === "medium" && (
                <>
                  {priorityIcons.medium}
                  {t("reminders.priority-medium")}
                </>
              )}
              {selectedEvent?.priority === "high" && (
                <>
                  {priorityIcons.high}
                  {t("reminders.priority-high")}
                </>
              )}
              {selectedEvent?.priority === "critical" && (
                <>
                  {priorityIcons.critical}
                  {t("reminders.priority-critical")}
                </>
              )}
            </div>
          </div>

          <div className={styles.notes}>
            <CustomDivider />
            {selectedEvent?.notes
              ? selectedEvent?.notes
              : t("reminders.no-notes")}
          </div>
        </DialogContent>
        <DialogActions>
          <div className={styles["buttons-container"]}>
            <CustomButton
              text={t("button.view-reminders")}
              onClick={() => navigate("/user-panel/reminders")}
              color="primary"
              variant="outlined"
            />
            <CustomButton
              text={t("button.close")}
              onClick={() => setOpen(false)}
              color="error"
              variant="outlined"
            />
          </div>
        </DialogActions>
      </Dialog>

      <div className={styles["calendar-container"]}>
        {projects.length > 0 ? (
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,dayGridDay",
            }}
            initialView="dayGridMonth"
            events={allEvents}
            height="80vh"
            aspectRatio={1}
            /* eventClick={handleEventClick} */
            eventClick={function (info) {
              if (info.event.extendedProps.type === "reminder") {
                info.jsEvent.preventDefault();
                setSelectedEvent({
                  title: info.event.title,
                  date: info.event.start.toLocaleDateString(),
                  time: info.event.extendedProps.time,
                  category: info.event.extendedProps.category,
                  priority: info.event.extendedProps.priority,
                  notes: info.event.extendedProps.notes,
                });
                setOpen(true);
              }
            }}
            eventDidMount={function (info) {
              info.el.setAttribute("title", info.event.title);
              if (info.event.extendedProps.type === "reminder") {
                info.el.style.cursor = "pointer";
              }
            }}
            locale={language}
            firstDay={1}
            eventTimeFormat={{
              hour: "numeric",
              minute: "2-digit",
              hour12: false,
            }}
            slotMinTime={"00:00"}
            slotMaxTime={"00:00"}
            buttonText={{
              today: t("calendar.today"),
              month: t("calendar.month"),
              week: t("calendar.week"),
              day: t("calendar.day"),
            }}
            eventMouseEnter={handleEventMouseEnter}
            eventMouseLeave={handleEventMouseLeave}
          />
        ) : (
          <div className={styles["no-projects"]}>
            <div>{t("calendar.no-projects")}</div>
            <CustomButton
              text={t("button.new-project")}
              variant="contained"
              icon={<AddCircleOutline />}
              onClick={() => navigate("/user-panel/projects/new")}
            />
          </div>
        )}
      </div>
    </>
  );
}
