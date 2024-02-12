import React, { useEffect, useMemo } from "react";
import styles from "./Dashboard.module.css";
import UserPanelHeader from "../../../components/ui/header/user-panel-header/UserPanelHeader";
import { useTranslation } from "react-i18next";
import { useProjects } from "../../../context/projects/ProjectsProvider";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const STATUS_ORDER = ["not started", "in progress", "finished", "stuck"];
const PRIORITY_ORDER = ["low", "medium", "high", "critical"];

export default function Dashboard() {
  const { t } = useTranslation();
  const { projects } = useProjects();

  const STATUS_COLORS = ["#676767", "#008000", "#3071D4", "#DC3545"];
  const PRIORITY_COLORS = ["#029a02", "#ff6b02", "#cd0303", "#FF0000"];

  const statusData = useMemo(() => {
    const statusCounts = projects.reduce((counts, project) => {
      counts[project.status] = (counts[project.status] || 0) + 1;
      return counts;
    }, {});

    const unorderedData = Object.entries(statusCounts).map(
      ([status, count]) => ({
        name: status,
        value: count,
      })
    );

    return STATUS_ORDER.map((status) =>
      unorderedData.find((item) => item.name === status)
    ).filter(Boolean);
  }, [projects]);

  const priorityData = useMemo(() => {
    const priorityCounts = projects.reduce((counts, project) => {
      counts[project.priority] = (counts[project.priority] || 0) + 1;
      return counts;
    }, {});

    const unorderedData = Object.entries(priorityCounts).map(
      ([priority, count]) => ({
        name: priority,
        value: count,
      })
    );

    return PRIORITY_ORDER.map((priority) =>
      unorderedData.find((item) => item.name === priority)
    ).filter(Boolean);
  }, [projects]);

  const projectsCreatedAtData = useMemo(() => {
    const dateCounts = projects.reduce((counts, project) => {
      const dateObject = project.createdAt.toDate();
      const dateString = dateObject.toLocaleDateString();

      counts[dateString] = counts[dateString] || { count: 0, date: dateObject };
      counts[dateString].count += 1;

      return counts;
    }, {});

    const createdAtArray = Object.entries(dateCounts).map(
      ([dateString, { count, date }]) => ({
        date: dateString,
        timestamp: date,
        count,
      })
    );

    createdAtArray.sort((a, b) => a.timestamp - b.timestamp);
    return createdAtArray;
  }, [projects]);

  const projectsStartDateData = useMemo(() => {
    const dateCounts = projects.reduce((counts, project) => {
      const dateObject = project.startDate.toDate();
      const dateString = dateObject.toLocaleDateString();

      counts[dateString] = counts[dateString] || { count: 0, date: dateObject };
      counts[dateString].count += 1;

      return counts;
    }, {});

    const startDateArray = Object.entries(dateCounts).map(
      ([dateString, { count, date }]) => ({
        date: dateString,
        timestamp: date,
        count,
      })
    );

    startDateArray.sort((a, b) => a.timestamp - b.timestamp);
    return startDateArray;
  }, [projects]);

  const projectsEndDateData = useMemo(() => {
    const dateCounts = projects.reduce((counts, project) => {
      if (project.endDate) {
        const dateObject = project.endDate.toDate();
        const dateString = dateObject.toLocaleDateString();

        counts[dateString] = counts[dateString] || {
          count: 0,
          date: dateObject,
        };
        counts[dateString].count += 1;
      }

      return counts;
    }, {});

    const endDateArray = Object.entries(dateCounts).map(
      ([dateString, { count, date }]) => ({
        date: dateString,
        timestamp: date,
        count,
      })
    );

    endDateArray.sort((a, b) => a.timestamp - b.timestamp);
    return endDateArray;
  }, [projects]);

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  return (
    <div className={styles["dashboard-container"]}>
      <UserPanelHeader title={t("user-panel-sidebar.dashboard")} />

      <div className={styles["dashboard-pie-chart-content"]}>
        <div className={styles["dashboard-pie-chart"]}>
          <p className={styles["dashboard-chart-title"]}>
            {t("dashboard.projects-by-status")}
          </p>
          <PieChart
            width={220}
            height={320}
            margin={"1rem"}
            className={styles["pie-chart"]}
          >
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={statusData}
              cx={110}
              cy={100}
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {statusData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={STATUS_COLORS[STATUS_ORDER.indexOf(entry.name)]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [
                value,
                t(`project.status-${name.replace(" ", "-")}`),
              ]}
            />
            <Legend
              layout="vertical"
              formatter={(value) =>
                t(`project.status-${value.replace(" ", "-")}`)
              }
            />
          </PieChart>
        </div>
        <div className={styles["dashboard-pie-chart"]}>
          <p className={styles["dashboard-chart-title"]}>
            {t("dashboard.projects-by-priority")}
          </p>
          <PieChart
            width={220}
            height={320}
            margin={"1rem"}
            className={styles["pie-chart"]}
          >
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={priorityData}
              cx={110}
              cy={100}
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {priorityData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PRIORITY_COLORS[PRIORITY_ORDER.indexOf(entry.name)]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [
                value,
                t(`project.priority-${name}`),
              ]}
            />
            <Legend
              layout="vertical"
              formatter={(value) => t(`project.priority-${value}`)}
            />
          </PieChart>
        </div>
      </div>

      <div className={styles["dashboard-projects-area-chart"]}>
        <p className={styles["dashboard-chart-title"]}>
          {t("dashboard.projects-by-date-creation")}
        </p>
        <ResponsiveContainer width="100%" aspect={2}>
          <AreaChart data={projectsCreatedAtData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ angle: -90, textAnchor: "end" }}
              height={100}
            />
            <YAxis
              tickCount={10}
              domain={[0, 10]}
              tickFormatter={(value) => (value >= 10 ? "10+" : value)}
            />
            <Tooltip
              formatter={(value) => [
                `${value} ${t("dashboard.project-count")}`,
              ]}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className={styles["dashboard-projects-area-chart"]}>
        <p className={styles["dashboard-chart-title"]}>
          {t("dashboard.projects-by-start-date")}
        </p>
        <ResponsiveContainer width="100%" aspect={2}>
          <AreaChart data={projectsStartDateData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ angle: -90, textAnchor: "end" }}
              height={100}
            />
            <YAxis
              tickCount={10}
              domain={[0, 10]}
              tickFormatter={(value) => (value >= 10 ? "10+" : value)}
            />
            <Tooltip
              formatter={(value) => [
                `${value} ${t("dashboard.project-count")}`,
              ]}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className={styles["dashboard-projects-area-chart"]}>
        <p className={styles["dashboard-chart-title"]}>
          {t("dashboard.projects-by-end-date")}
        </p>
        <ResponsiveContainer width="100%" aspect={2}>
          <AreaChart data={projectsEndDateData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ angle: -90, textAnchor: "end" }}
              height={100}
            />
            <YAxis
              tickCount={10}
              domain={[0, 10]}
              tickFormatter={(value) => (value >= 10 ? "10+" : value)}
            />
            <Tooltip
              formatter={(value) => [
                `${value} ${t("dashboard.project-count")}`,
              ]}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
