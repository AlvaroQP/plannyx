import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { useTranslation } from "react-i18next";
import Login from "../../../auth/login/Login";
import Signup from "../../../auth/signup/Signup";

export default function LoginSignUpButtons({ handleCloseNavMenu }) {
  const { t } = useTranslation();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  function handleShowLogin() {
    setShowLogin(true);
    if (handleCloseNavMenu) {
      handleCloseNavMenu();
    }
  }

  function handleCloseLogin() {
    setShowLogin(false);
  }

  function handleShowSignUp() {
    setShowSignUp(true);
    if (handleCloseNavMenu) {
      handleCloseNavMenu();
    }
  }

  function handleCloseSignUp() {
    setShowSignUp(false);
  }

  return (
    <>
      <CustomButton
        text={t("button.login")}
        variant="contained"
        color="primary"
        onClick={handleShowLogin}
      />
      <CustomButton
        text={t("button.sign-up")}
        variant="contained"
        color="success"
        onClick={handleShowSignUp}
      />

      {showLogin && <Login handleCloseLogin={handleCloseLogin} />}
      {showSignUp && <Signup handleCloseSignUp={handleCloseSignUp} />}
    </>
  );
}
