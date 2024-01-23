import React, { useState, useEffect } from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import styles from "./ScrollTop.module.css";

export default function ScrollTop() {
  const [showScroll, setShowScroll] = useState(false);

  function checkScrollTop() {
    if (!showScroll && window.scrollY > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    showScroll && (
      <div className={styles["scroll-top"]} onClick={scrollToTop}>
        <ArrowCircleUpIcon className={styles.arrow} fontSize="large" />
      </div>
    )
  );
}
