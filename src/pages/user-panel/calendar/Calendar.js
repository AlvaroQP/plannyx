/* import React, { useState, useMemo } from "react";
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
  const [currentView, setCurrentView] = useState("month");

  const calendarStyle =
    currentView === "month" ? { height: "85vh" } : { height: "auto" };

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

  const myDayStart = new Date();
  myDayStart.setHours(0, 0, 0, 0);

  const myDayEnd = new Date();
  myDayEnd.setHours(0, 0, 0, 0);

  return (
    <>
      <UserPanelHeader title={t("user-panel-sidebar.calendar")} />
      <div className={styles["calendar-container"]}>
        <Calendar
          culture={language === "es" ? "es" : "en"}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={calendarStyle}
          views={["month", "week", "day"]}
          onView={setCurrentView}
          messages={messages}
          step={60}
          min={myDayStart}
          max={myDayEnd}
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
 */

import React from "react";

export default function Calendar() {
  return <div>Calendar</div>;
}
