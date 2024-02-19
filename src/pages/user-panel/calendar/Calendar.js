import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useProjects } from "../../../context/projects/ProjectsProvider";
import UserPanelHeader from "../../../components/ui/header/user-panel-header/UserPanelHeader";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/language/LanguageProvider";
import styles from "./Calendar.module.css";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import CustomButton from "../../../components/ui/button/CustomButton";

export default function CalendarView() {
  const { projects } = useProjects();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { language } = useLanguage();

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

  const events = projects.map((project, index) => {
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
    };
  });

  function handleEventClick(event) {
    navigate(event.url);
  }

  function handleEventMouseEnter(info) {
    info.el.style.border = ".5px solid black";
    info.el.style.fontWeight = "600";
  }

  function handleEventMouseLeave(info) {
    info.el.style.border = "none";
    info.el.style.fontWeight = "normal";
  }

  return (
    <>
      <UserPanelHeader title={t("user-panel-sidebar.calendar")} />
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
            events={events}
            height="80vh"
            aspectRatio={1}
            eventClick={handleEventClick}
            locale={language}
            firstDay={1}
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
