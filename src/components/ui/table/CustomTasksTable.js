import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Typography,
  Box,
  IconButton,
  TableContainer,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../context/language/LanguageProvider";
import TablePagination from "@mui/material/TablePagination";
import { useTasks } from "../../../context/tasks/TasksProvider";
import { useLoading } from "../../../context/loading/LoadingProvider";
import { useDialog } from "../../../context/dialog/DialogProvider";
import CustomDialog from "../../../components/ui/dialog/CustomDialog";
import styles from "./CustomTasksTable.module.css";

export default function CustomTasksTable({ title, rows }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const statusOrder = ["not started", "in progress", "finished", "stuck"];
  const priorityOrder = ["low", "medium", "high", "critical"];
  const { deleteTask } = useTasks();
  const { setIsLoading } = useLoading();
  const { openDialog } = useDialog();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function handleRowSelect(row) {
    const selectedIndex = selectedRows.indexOf(row);
    let newSelected = [...selectedRows];

    if (selectedIndex === -1) {
      newSelected.push(row);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedRows(newSelected);
  }

  function isRowSelected(row) {
    return selectedRows.indexOf(row) !== -1;
  }

  function handleOpenDeleteDialog() {
    setOpenDeleteDialog(true);
  }

  function handleCloseDeleteDialog() {
    setOpenDeleteDialog(false);
  }

  async function handleDeleteSelected() {
    setIsLoading(true);
    let deletionFailed = false;

    for (const row of selectedRows) {
      try {
        await deleteTask(row.id);
      } catch (error) {
        console.error("Error deleting task:", error);
        deletionFailed = true;
      }
    }

    if (deletionFailed) {
      openDialog({
        title: t("task.error"),
        description:
          selectedRows.length > 1
            ? t("task.tasks-not-deleted")
            : t("task.task-not-deleted"),
        severity: "error",
      });
    } else {
      openDialog({
        title: t("task.success"),
        description:
          selectedRows.length > 1
            ? t("task.tasks-deleted")
            : t("task.task-deleted"),
        severity: "success",
      });
    }

    setIsLoading(false);
  }

  function handleEditTask(task, field, value) {
    console.log("Editing task:", task, "Field:", field.key, "Value:", value);
  }

  function handleSort(key) {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  }

  const sortedRows = [...rows].sort((a, b) => {
    if (sortConfig.key === "status") {
      return sortConfig.direction === "asc"
        ? statusOrder.indexOf(a[sortConfig.key]) -
            statusOrder.indexOf(b[sortConfig.key])
        : statusOrder.indexOf(b[sortConfig.key]) -
            statusOrder.indexOf(a[sortConfig.key]);
    } else if (sortConfig.key === "priority") {
      return sortConfig.direction === "asc"
        ? priorityOrder.indexOf(a[sortConfig.key]) -
            priorityOrder.indexOf(b[sortConfig.key])
        : priorityOrder.indexOf(b[sortConfig.key]) -
            priorityOrder.indexOf(a[sortConfig.key]);
    } else if (sortConfig.key === "startDate" || sortConfig.key === "endDate") {
      let dateA =
        a[sortConfig.key] === "not-specified"
          ? new Date(8640000000000000)
          : new Date(a[sortConfig.key]);
      let dateB =
        b[sortConfig.key] === "not-specified"
          ? new Date(8640000000000000)
          : new Date(b[sortConfig.key]);
      return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
    } else {
      let aValue = String(a[sortConfig.key]).toLowerCase();
      let bValue = String(b[sortConfig.key]).toLowerCase();

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    }
  });

  const headerMapping = {
    name: t("task.task"),
    startDate: t("task.start-date"),
    endDate: t("task.end-date"),
    status: t("task.status"),
    priority: t("task.priority"),
  };

  const statusMapping = {
    "not started": t("task.status-not-started"),
    "in progress": t("task.status-in-progress"),
    finished: t("task.status-finished"),
    stuck: t("task.status-stuck"),
  };

  const priorityMapping = {
    low: t("task.low"),
    medium: t("task.medium"),
    high: t("task.high"),
    critical: t("task.critical"),
  };

  const headers =
    rows.length > 0
      ? Object.keys(rows[0])
          .filter((key) => key !== "id")
          .map((key) => ({
            key,
            displayTitle: headerMapping[key] || key,
          }))
      : [];

  const content =
    rows.length > 0 ? (
      <>
        {openDeleteDialog && (
          <CustomDialog
            open={openDeleteDialog}
            handleClose={handleCloseDeleteDialog}
            title={
              selectedRows.length > 1
                ? t("task.delete-tasks")
                : t("task.delete-task")
            }
            description={
              selectedRows.length > 1
                ? t("task.delete-tasks-description")
                : t("task.delete-task-description")
            }
            acceptText={t("button.delete")}
            cancelText={t("button.cancel")}
            acceptAction={handleDeleteSelected}
          />
        )}

        <Box className={styles["tasks-table-container"]}>
          <Typography
            className={styles["title-header"]}
            sx={{ flex: "1 1 100%" }}
            component="div"
          >
            {selectedRows.length > 0 ? (
              <div className={styles["selected-rows-container"]}>
                <div className={styles["selected-rows-title"]}>
                  {selectedRows.length}{" "}
                  {`${t("task.selected")}${
                    selectedRows.length > 1 && language === "es" ? "s" : ""
                  }`}
                </div>
                <Tooltip
                  title={
                    selectedRows.length > 1
                      ? t("task.delete-tasks")
                      : t("task.delete-task")
                  }
                >
                  <IconButton onClick={handleOpenDeleteDialog}>
                    <DeleteIcon sx={{ color: "#fff" }} />
                  </IconButton>
                </Tooltip>
              </div>
            ) : (
              <div className={styles["table-title"]}>{title}</div>
            )}
          </Typography>

          <TableContainer>
            <Table className={styles["tasks-table"]}>
              <TableHead>
                <TableRow>
                  <TableCell
                    padding="checkbox"
                    className={styles["table-cell-header-checkbox"]}
                  >
                    <Checkbox
                      indeterminate={
                        selectedRows.length > 0 &&
                        selectedRows.length < rows.length
                      }
                      checked={
                        rows.length > 0 && selectedRows.length === rows.length
                      }
                      onChange={() => {
                        if (selectedRows.length === rows.length) {
                          setSelectedRows([]);
                        } else {
                          setSelectedRows([...rows]);
                        }
                      }}
                    />
                  </TableCell>

                  {headers.map((header) => (
                    <TableCell
                      key={header.key}
                      className={styles["table-cell-header"]}
                    >
                      <TableSortLabel
                        active={sortConfig.key === header.key}
                        direction={
                          sortConfig.key === header.key
                            ? sortConfig.direction
                            : "asc"
                        }
                        onClick={() => handleSort(header.key)}
                      >
                        {header.displayTitle}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {sortedRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      key={index}
                      selected={isRowSelected(row)}
                      className={styles["table-row"]}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isRowSelected(row)}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleRowSelect(row);
                          }}
                        />
                      </TableCell>
                      {headers.map((header) => (
                        <TableCell
                          key={header.key}
                          className={
                            header.key === "name"
                              ? styles["cell-max-width"]
                              : styles["table-cell"]
                          }
                          onClick={() =>
                            handleEditTask(row, header, row[header.key])
                          }
                        >
                          {header.key === "status" &&
                            statusMapping[row[header.key]]}
                          {header.key === "priority" &&
                            priorityMapping[row[header.key]]}
                          {header.key === "startDate" &&
                            row.startDate.toLocaleDateString()}
                          {header.key === "endDate" &&
                            row.endDate instanceof Date &&
                            row.endDate.toLocaleDateString()}
                          {header.key === "endDate" &&
                            row.endDate === "not-specified" &&
                            t("task.end-date-not-specified")}
                          {header.key !== "status" &&
                            header.key !== "priority" &&
                            header.key !== "startDate" &&
                            header.key !== "endDate" &&
                            row[header.key]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={rows.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={t("task.table-rows-per-page")}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} ${t("task.table-of")} ${count}`
            }
            sx={{ backgroundColor: "#EAEAEA" }}
          />
        </Box>
      </>
    ) : (
      <Typography className={styles["no-tasks-message"]}>
        {t("task.no-tasks-with-this-status")}
      </Typography>
    );

  return content;
}

CustomTasksTable.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};
