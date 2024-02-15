import React, { useState, useEffect } from "react";
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
  TextField,
  MenuItem,
  Select,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../context/language/LanguageProvider";
import TablePagination from "@mui/material/TablePagination";
import { useTasks } from "../../../context/tasks/TasksProvider";
import { useLoading } from "../../../context/loading/LoadingProvider";
import { useDialog } from "../../../context/dialog/DialogProvider";
import CustomDialog from "../../../components/ui/dialog/CustomDialog";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";
import SignalCellular1BarIcon from "@mui/icons-material/SignalCellular1Bar";
import SignalCellular2BarIcon from "@mui/icons-material/SignalCellular2Bar";
import SignalCellular3BarIcon from "@mui/icons-material/SignalCellular3Bar";
import SignalCellularConnectedNoInternet4BarIcon from "@mui/icons-material/SignalCellularConnectedNoInternet4Bar";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEditAlert } from "../../../context/alerts/EditAlertProvider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import styles from "./CustomTasksTable.module.css";
import CustomDivider from "../divider/CustomDivider";
import NotesIcon from "@mui/icons-material/Notes";
import EditNoteIcon from "@mui/icons-material/EditNote";

export default function CustomTasksTable({ title, rows }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [expandedRows, setExpandedRows] = useState([]);
  const statusOrder = ["not started", "in progress", "finished", "stuck"];
  const priorityOrder = ["low", "medium", "high", "critical"];
  const { deleteTask, putTask } = useTasks();
  const { setIsLoading } = useLoading();
  const { openDialog } = useDialog();
  const {
    isEditAlertOpen,
    isErrorEditAlertOpen,
    handleOpenEditAlert,
    handleCloseEditAlert,
    handleOpenErrorEditAlert,
    handleCloseErrorEditAlert,
  } = useEditAlert();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedNotes, setEditedNotes] = useState("");
  const [editedStartDate, setEditedStartDate] = useState(null);
  const [editedEndDate, setEditedEndDate] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");
  const [editedPriority, setEditedPriority] = useState("");

  useEffect(() => {
    setExpandedRows(new Array(rows.length).fill(false));
  }, [rows.length]);

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

  function handleExpandRow(row) {
    const rowIndex = rows.indexOf(row);
    setExpandedRows((prevExpandedRows) => {
      const newExpandedRows = [...prevExpandedRows];
      newExpandedRows[rowIndex] = !newExpandedRows[rowIndex];
      return newExpandedRows;
    });
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

  function resetValues() {
    setEditedName("");
    setEditedNotes("");
    setEditedStartDate(null);
    setEditedEndDate(null);
    setEditedStatus("");
    setEditedPriority("");
  }

  function handleEditTask(task, field, value) {
    if (
      editingRow &&
      (editingRow.task !== task || editingRow.field.key !== field.key)
    ) {
      handleCancelEdit();
    }
    setEditingRow({ task, field });
  }

  function handleCancelEdit() {
    setEditingRow(null);
    resetValues();
  }

  async function handleSaveEdit() {
    setIsLoading(true);
    const updatedFields = {};

    if (!editingRow || !editingRow.task) {
      console.error("Editing row or task is undefined");
      setIsLoading(false);
      return;
    }

    if (
      editedEndDate !== null &&
      dayjs(editingRow.task.startDate).isAfter(editedEndDate)
    ) {
      openDialog({
        title: t("task.error"),
        description: t("task.end-date-after-start-date"),
        severity: "error",
      });
      setIsLoading(false);
      return;
    }

    if (editedName !== "") {
      updatedFields.name = editedName;
    }
    if (editedNotes !== "") {
      updatedFields.notes = editedNotes;
    }
    if (editedStartDate !== null) {
      updatedFields.startDate = Timestamp.fromDate(editedStartDate.toDate());
    }
    if (editedEndDate !== null) {
      updatedFields.endDate = Timestamp.fromDate(editedEndDate.toDate());
    }
    if (editedEndDate === "not-specified") {
      updatedFields.endDate = null;
    }
    if (editedStatus !== "") {
      updatedFields.status = editedStatus;
    }
    if (editedPriority !== "") {
      updatedFields.priority = editedPriority;
    }
    if (editingRow.task.endDate === "not-specified") {
      updatedFields.endDate = null;
    }
    if (editingRow.task.endDate === "not-specified" && editedEndDate !== null) {
      updatedFields.endDate = Timestamp.fromDate(editedEndDate.toDate());
    }

    // Construct the updated task object
    const { id, ...fieldsWithoutId } = editingRow.task;
    const updatedTask = { ...fieldsWithoutId, ...updatedFields };

    try {
      await putTask(editingRow.task.id, updatedTask);
      setEditingRow(null);
      resetValues();
      handleOpenEditAlert();
    } catch (error) {
      console.error("Error updating task:", error);
      handleOpenErrorEditAlert();
    } finally {
      setIsLoading(false);
    }
  }

  function renderEditField(
    key,
    value,
    handleValueChange,
    statusMapping,
    priorityMapping
  ) {
    switch (key) {
      case "name":
        return (
          <TextField
            multiline
            defaultValue={value}
            onChange={(e) => setEditedName(e.target.value)}
          />
        );
      case "notes":
        return (
          <TextField
            multiline
            defaultValue={value}
            onChange={(e) => setEditedNotes(e.target.value)}
          />
        );
      case "startDate":
        return (
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={dayjs.locale(language)}
          >
            <DatePicker
              value={editedStartDate}
              onChange={(newValue) => setEditedStartDate(newValue)}
            />
          </LocalizationProvider>
        );
      case "endDate":
        return (
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={dayjs.locale(language)}
          >
            <DatePicker
              value={editedEndDate}
              onChange={(newValue) => setEditedEndDate(newValue)}
            />
          </LocalizationProvider>
        );
      case "status":
        return (
          <Select
            value={editedStatus || value}
            onChange={(e) => {
              setEditedStatus(e.target.value);
            }}
          >
            {Object.keys(statusMapping).map((status) => (
              <MenuItem key={status} value={status}>
                {statusMapping[status]}
              </MenuItem>
            ))}
          </Select>
        );
      case "priority":
        return (
          <Select
            value={editedPriority || value}
            onChange={(e) => setEditedPriority(e.target.value)}
          >
            {Object.keys(priorityMapping).map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priorityMapping[priority]}
              </MenuItem>
            ))}
          </Select>
        );
      default:
        return <TextField defaultValue={value} />;
    }
  }

  function renderDisplayField(key, value) {
    let statusClassName;
    if (
      statusMapping[value] === "Not started" ||
      statusMapping[value] === "No iniciada"
    ) {
      statusClassName = "not-started-status";
    } else if (
      statusMapping[value] === "In progress" ||
      statusMapping[value] === "En progreso"
    ) {
      statusClassName = "in-progress-status";
    } else if (
      statusMapping[value] === "Finished" ||
      statusMapping[value] === "Finalizada"
    ) {
      statusClassName = "finished-status";
    } else if (
      statusMapping[value] === "Stuck" ||
      statusMapping[value] === "Atascada"
    ) {
      statusClassName = "stuck-status";
    }

    switch (key) {
      case "status":
        return (
          <div className={styles[`${statusClassName}`]}>
            {statusMapping[value]}
          </div>
        );
      case "priority":
        let priorityIcon;
        if (
          priorityMapping[value] === "Low" ||
          priorityMapping[value] === "Baja"
        ) {
          priorityIcon = (
            <SignalCellular1BarIcon
              sx={{ fontSize: ".9rem", color: "#029a02" }}
            />
          );
        } else if (
          priorityMapping[value] === "Medium" ||
          priorityMapping[value] === "Media"
        ) {
          priorityIcon = (
            <SignalCellular2BarIcon
              sx={{ fontSize: ".9rem", color: "#ff6b02" }}
            />
          );
        } else if (
          priorityMapping[value] === "High" ||
          priorityMapping[value] === "Alta"
        ) {
          priorityIcon = (
            <SignalCellular3BarIcon
              sx={{ fontSize: ".9rem", color: "#cd0303" }}
            />
          );
        } else if (
          priorityMapping[value] === "Critical" ||
          priorityMapping[value] === "Crítica"
        ) {
          priorityIcon = (
            <SignalCellularConnectedNoInternet4BarIcon
              sx={{ fontSize: ".9rem", color: "#ff0000" }}
            />
          );
        }

        return (
          <div className={styles["priority-div-container"]}>
            {priorityIcon} {priorityMapping[value]}
          </div>
        );

      case "startDate":
        return value.toLocaleDateString();
      case "endDate":
        return value instanceof Date
          ? value.toLocaleDateString()
          : value === "not-specified"
          ? t("task.end-date-not-specified")
          : value;
      default:
        return value;
    }
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
    startDate: t("task-table.start-date"),
    endDate: t("task-table.end-date"),
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
          .filter((key) => key !== "id" && key !== "notes")
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
            {isEditAlertOpen && (
              <Snackbar
                open={isEditAlertOpen}
                onClose={handleCloseEditAlert}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <Alert severity="success" variant="filled">
                  {t("task.task-updated")}
                </Alert>
              </Snackbar>
            )}

            {isErrorEditAlertOpen && (
              <Snackbar
                open={isErrorEditAlertOpen}
                onClose={handleCloseErrorEditAlert}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <Alert severity="error" variant="filled">
                  {t("task.could-not-update-task")}
                </Alert>
              </Snackbar>
            )}

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
                    <React.Fragment key={row.id}>
                      <TableRow
                        selected={isRowSelected(row)}
                        className={styles["table-row"]}
                        key={row.id + "-not-expanded"}
                      >
                        <TableCell
                          padding="checkbox"
                          className={styles["checkbox-and-expand-container"]}
                        >
                          <Checkbox
                            checked={isRowSelected(row)}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleRowSelect(row);
                            }}
                          />
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => handleExpandRow(row)}
                            key={index}
                            sx={{ ml: 0.5 }}
                          >
                            {expandedRows[index] ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </TableCell>

                        {headers.map((header) => (
                          <TableCell
                            key={header.key}
                            className={
                              header.key === "name"
                                ? styles["cell-max-width"]
                                : header.key === "status"
                                ? styles["status-cell"]
                                : styles["table-cell"]
                            }
                            onClick={() =>
                              handleEditTask(row, header, row[header.key])
                            }
                          >
                            {editingRow &&
                            editingRow.task === row &&
                            editingRow.field.key === header.key ? (
                              <div className={styles["edit-field-container"]}>
                                {renderEditField(
                                  header.key,
                                  row[header.key],
                                  (newValue) =>
                                    handleEditTask(row, header, newValue),
                                  statusMapping,
                                  priorityMapping
                                )}
                                <br />
                                <div
                                  className={
                                    styles["cancel-save-button-container"]
                                  }
                                >
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCancelEdit();
                                    }}
                                    sx={{ color: "red" }}
                                  >
                                    {t("button.cancel")}{" "}
                                    <CancelIcon
                                      sx={{ ml: ".25rem", fontSize: "1rem" }}
                                    />
                                  </Button>

                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSaveEdit();
                                    }}
                                    sx={{ color: "green" }}
                                  >
                                    {t("button.save")}{" "}
                                    <CheckCircleIcon
                                      sx={{ ml: ".25rem", fontSize: "1rem" }}
                                    />
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              renderDisplayField(header.key, row[header.key])
                            )}
                          </TableCell>
                        ))}
                      </TableRow>

                      {expandedRows[index] && (
                        <TableRow
                          key={row.id + "-expanded"}
                          className={styles["notes-row"]}
                        >
                          <TableCell
                            style={{ paddingBottom: 0, paddingTop: 0 }}
                            colSpan={6}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <div className={styles["notes-title"]}>
                                {row.notes !== ""
                                  ? t("task.task-notes")
                                  : t("task.no-notes")}
                                <NotesIcon />
                              </div>
                              <CustomDivider />
                              <div className={styles["notes-text"]}>
                                {editingRow &&
                                editingRow.task === row &&
                                editingRow.field === "notes" ? (
                                  <div
                                    className={styles["edit-notes-container"]}
                                  >
                                    <TextField
                                      multiline
                                      fullWidth
                                      rows={4}
                                      width="100%"
                                      label={t("task.add-notes")}
                                      defaultValue={row.notes}
                                      onChange={(e) =>
                                        setEditedNotes(e.target.value)
                                      }
                                    />
                                    <br />
                                    <div
                                      className={
                                        styles["cancel-save-button-container"]
                                      }
                                    >
                                      <Button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleCancelEdit();
                                        }}
                                        sx={{ color: "red" }}
                                      >
                                        {t("button.cancel")}{" "}
                                        <CancelIcon
                                          sx={{
                                            ml: ".25rem",
                                            fontSize: "1rem",
                                          }}
                                        />
                                      </Button>

                                      <Button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleSaveEdit();
                                        }}
                                        sx={{ color: "green" }}
                                      >
                                        {t("button.save")}{" "}
                                        <CheckCircleIcon
                                          sx={{
                                            ml: ".25rem",
                                            fontSize: "1rem",
                                          }}
                                        />
                                      </Button>
                                    </div>
                                  </div>
                                ) : row.notes !== "" ? (
                                  <div
                                    className={styles["notes-div-clickable"]}
                                    onClick={() =>
                                      handleEditTask(
                                        row,
                                        "notes",
                                        row["notes".key]
                                      )
                                    }
                                  >
                                    {row.notes} <EditNoteIcon />
                                  </div>
                                ) : (
                                  <div
                                    className={styles["notes-div-clickable"]}
                                    onClick={() =>
                                      handleEditTask(
                                        row,
                                        "notes",
                                        row["notes".key]
                                      )
                                    }
                                  >
                                    {t("task.add-notes")} <EditNoteIcon />
                                  </div>
                                )}
                              </div>
                            </Box>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
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
