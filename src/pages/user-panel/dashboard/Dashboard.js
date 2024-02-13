import React, { useState, useMemo } from "react";
import styles from "./Dashboard.module.css";
import UserPanelHeader from "../../../components/ui/header/user-panel-header/UserPanelHeader";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/ui/button/CustomButton";
import { useProjects } from "../../../context/projects/ProjectsProvider";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
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
  const navigate = useNavigate();
  const [projectsToDisplay, setProjectsToDisplay] = useState([]);

  const STATUS_COLORS = ["#676767", "#008000", "#3071D4", "#DC3545"];
  const PRIORITY_COLORS = ["#EED202", "#FFA500", "#FF4500", "#FF0000"];

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

  const totalStatusCount = useMemo(() => {
    return statusData.reduce((total, status) => total + status.value, 0);
  }, [statusData]);

  const totalPriorityCount = useMemo(() => {
    return priorityData.reduce((total, priority) => total + priority.value, 0);
  }, [priorityData]);

  function handleStatusPieHover(data) {
    const status = data.name;
    const filteredProjects = projects.filter(
      (project) => project.status === status
    );
    const projectNames = filteredProjects.map((project) => project.name);
    setProjectsToDisplay(projectNames);
  }

  function handlePriorityPieHover(data) {
    const priority = data.name;
    const filteredProjects = projects.filter(
      (project) => project.priority === priority
    );
    const projectNames = filteredProjects.map((project) => project.name);
    setProjectsToDisplay(projectNames);
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const displayItems = projectsToDisplay.slice(0, 10);
      const remainingItems = projectsToDisplay.length - 10;

      return (
        <div className={styles["projects-tooltip-content"]}>
          {displayItems.map((project, index) => (
            <p key={index}>{project}</p>
          ))}
          {remainingItems > 0 && (
            <p>
              +{remainingItems} {t("dashboard.more")}
            </p>
          )}
        </div>
      );
    }

    return null;
  };

  const noProjectsContent = (
    <>
      <UserPanelHeader title={t("user-panel-sidebar.dashboard")} />
      <div className={styles["dashboard-no-projects-container"]}>
        <p>{t("dashboard.no-projects-message")}</p>
        <CustomButton
          text={t("button.new-project")}
          onClick={() => navigate("/user-panel/projects/new")}
          variant="contained"
          color="primary"
          icon={<AddCircleOutlineIcon />}
        />
      </div>
    </>
  );

  const dashboardContent = (
    <div className={styles["dashboard-container"]}>
      <UserPanelHeader title={t("user-panel-sidebar.dashboard")} />

      <div className={styles["dashboard-pie-chart-content"]}>
        <div className={styles["dashboard-pie-chart"]}>
          <p className={styles["dashboard-chart-title"]}>
            {t("dashboard.projects-by-status")}
          </p>
          <PieChart
            width={240}
            height={330}
            margin={"1rem"}
            className={styles["pie-chart"]}
          >
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={statusData}
              /*               cx={110}
              cy={120} */
              outerRadius={80}
              fill="#8884d8"
              label
              onMouseOver={handleStatusPieHover}
            >
              {statusData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={STATUS_COLORS[STATUS_ORDER.indexOf(entry.name)]}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="vertical"
              formatter={(value, entry) => {
                const percentage = (
                  (entry.payload.value / totalStatusCount) *
                  100
                ).toFixed(2);
                return `${t(
                  `project.status-${value.replace(" ", "-")}`
                )} (${percentage}%)`;
              }}
            />
          </PieChart>
        </div>
        <div className={styles["dashboard-pie-chart"]}>
          <p className={styles["dashboard-chart-title"]}>
            {t("dashboard.projects-by-priority")}
          </p>
          <PieChart
            width={240}
            height={330}
            margin={"1rem"}
            className={styles["pie-chart"]}
          >
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={priorityData}
              /*               cx={110}
              cy={120} */
              outerRadius={80}
              fill="#8884d8"
              label
              onMouseOver={handlePriorityPieHover}
            >
              {priorityData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PRIORITY_COLORS[PRIORITY_ORDER.indexOf(entry.name)]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="vertical"
              formatter={(value, entry) => {
                const percentage = (
                  (entry.payload.value / totalPriorityCount) *
                  100
                ).toFixed(2);
                return `${t(
                  `project.priority-${value.replace(" ", "-")}`
                )} (${percentage}%)`;
              }}
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
              stroke="#3071D4"
              fill="#3071D4"
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
              stroke="#3071D4"
              fill="#3071D4"
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
              stroke="#3071D4"
              fill="#3071D4"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return projects.length === 0 ? noProjectsContent : dashboardContent;
}
