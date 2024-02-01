import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import styles from "./CustomScrollableTabs.module.css";

/*  Receives an array of objects with the following structure: 
  [{ id: number, name: string, content: JSX.Element }] */

export default function CustomScrollableTabs({ tabs }) {
  const [value, setValue] = useState(String(tabs[0].id));

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <TabContext value={value}>
      <Box className={styles["tabs-container"]}>
        <TabList
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable tabs"
          onChange={handleChange}
          className={styles["tab-list"]}
        >
          {tabs.map((tab) => (
            <Tab key={tab.id} label={tab.name} value={String(tab.id)} />
          ))}
        </TabList>
        {tabs.map((tab) => (
          <TabPanel key={tab.id} value={String(tab.id)}>
            {tab.content}
          </TabPanel>
        ))}
      </Box>
    </TabContext>
  );
}
