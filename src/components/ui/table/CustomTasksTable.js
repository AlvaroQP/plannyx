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
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../context/language/LanguageProvider";
import styles from "./CustomTasksTable.module.css";

export default function CustomTasksTable({ title, rows }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const { t } = useTranslation();
  const { language } = useLanguage();

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

  function handleDeleteSelected() {
    // Implement your delete logic here, using the selectedRows array
    console.log("Deleting selected rows:", selectedRows);
  }

  const headerMapping = {
    name: t("task.task"),
    startDate: t("task.start-date"),
    endDate: t("task.end-date"),
    status: t("task.status"),
    priority: t("task.priority"),
  };

  const headers =
    rows.length > 0
      ? Object.keys(rows[0]).map((key) => ({
          key,
          displayTitle: headerMapping[key] || key,
        }))
      : [];

  return (
    <Paper className={styles["tasks-table-container"]}>
      <Typography variant="h6" component="div">
        {selectedRows.length > 0 ? (
          <div className={styles["selected-rows-container"]}>
            <div className={styles["selected-rows-title"]}>
              {selectedRows.length}{" "}
              {`${t("task.selected")}${
                selectedRows.length > 1 && language === "es" ? "s" : ""
              }`}
            </div>
            <IconButton onClick={handleDeleteSelected}>
              <DeleteIcon sx={{ color: "#fff" }} />
            </IconButton>
          </div>
        ) : (
          <div className={styles["table-title"]}>{title}</div>
        )}
      </Typography>
      <Table className={styles["tasks-table"]}>
        <TableHead>
          <TableRow>
            <TableCell
              padding="checkbox"
              className={styles["table-cell-header-checkbox"]}
            >
              <Checkbox
                indeterminate={
                  selectedRows.length > 0 && selectedRows.length < rows.length
                }
                checked={rows.length > 0 && selectedRows.length === rows.length}
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
                {header.displayTitle}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              hover
              onClick={() => handleRowSelect(row)}
              selected={isRowSelected(row)}
              className={styles["table-row"]}
            >
              <TableCell padding="checkbox">
                <Checkbox checked={isRowSelected(row)} />
              </TableCell>
              {headers.map((header) => (
                <TableCell key={header.key}>{row[header.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomTasksTable.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};
