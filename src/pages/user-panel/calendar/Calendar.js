import React, { useMemo } from "react";
import styles from "./Calendar.module.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import UserPanelHeader from "../../../components/ui/header/user-panel-header/UserPanelHeader";
import { useTranslation } from "react-i18next";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import { useProjects } from "../../../context/projects/ProjectsProvider";
import { useLanguage } from "../../../context/language/LanguageProvider";
import { useNavigate } from "react-router-dom";

require("globalize/lib/cultures/globalize.culture.es");

export default function CalendarView() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const lang = {
    en: null,
    es: {
      month: "Mes",
      week: "Semana",
      day: "Día",
      today: "Hoy",
      previous: "Anterior",
      next: "Siguiente",
      showMore: (total) => `+${total} más`,
    },
  };

  const localizer = useMemo(() => {
    return dayjsLocalizer(dayjs);
  }, []);

  const { projects } = useProjects();

  const events = projects.map((project) => {
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
    };
  });

  const messages = lang[language] || {};

  return (
    <>
      <UserPanelHeader title={t("user-panel-sidebar.calendar")} />
      <div className={styles["calendar-container"]}>
        <Calendar
          culture={language}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "85vh" }}
          views={["month", "week", "day"]}
          messages={messages}
          step={60}
          eventPropGetter={(event, start, end, isSelected) => {
            let newStyle = {
              backgroundColor: "#4c8dbf",
              color: "#fff",
              borderRadius: ".2rem",
              fontSize: ".85rem",
              border: "none",
            };

            return {
              className: styles["my-event"],
              style: newStyle,
            };
          }}
          onSelectEvent={(event) => {
            navigate(event.url);
          }}
        />
      </div>
    </>
  );
}
