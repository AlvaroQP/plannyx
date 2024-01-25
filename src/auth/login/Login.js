import React, { useState } from "react";
import CustomButton from "../../components/ui/button/CustomButton";
import { TextField } from "@mui/material";
import { useAlert } from "../../context/alerts/AlertProvider";
import { useAuth } from "../auth-context/AuthProvider";
import Box from "@mui/material/Box";
import AuthFormAlert from "../../components/ui/alert/AuthFormAlert";
import googleIcon from "../../assets/icons/google-icon.png";
import LoginIcon from "@mui/icons-material/Login";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useLoading } from "../../context/loading/LoadingProvider";
import { useTranslation } from "react-i18next";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import CustomDivider from "../../components/ui/divider/CustomDivider";
import styles from "./Login.module.css";

export default function Login({ handleCloseLogin }) {
  const { login, loginWithGoogle, setIsUserEmailVerified } = useAuth();
  const { setIsLoading } = useLoading();
  const { createAlert } = useAlert();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await login(email, password);
      if (!userCredential.user.emailVerified) {
        setError(t("signup.verify-email"));
      } else {
        createAlert(
          "success",
          `${t("login.welcome")}, ${userCredential.user.displayName}!`
        );
        setIsUserEmailVerified(true);
        handleCloseLogin();
      }
    } catch (error) {
      setError(t("login.invalid-email-password"));
      setEmail("");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <Dialog
      open={true}
      onClose={handleCloseLogin}
      sx={{ "& .MuiBackdrop-root": { backgroundColor: "rgba(0, 0, 0, 0.85)" } }}
    >
      <DialogContent className={styles["dialog-content"]} sx={{ padding: 0 }}>
        <form onSubmit={handleLogin} className={styles.form}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton edge="end" onClick={handleCloseLogin}>
              <CloseIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Box>
          <h2 className={styles["form-title"]}>{t("login.title")}</h2>
          <CustomDivider />

          {error && <AuthFormAlert severity="error" message={error} />}

          <TextField
            type="email"
            value={email}
            label={t("login.field.email")}
            variant="filled"
            required
            sx={{ backgroundColor: "#FFF", mt: 2 }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <TextField
            type={showPassword ? "text" : "password"}
            value={password}
            label={t("login.field.password")}
            variant="filled"
            required
            sx={{ backgroundColor: "white" }}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <br />
          <CustomButton
            variant="contained"
            color="primary"
            text={t("button.login")}
            icon={<LoginIcon />}
            type="submit"
          />

          <Box
            sx={{ width: "100%", border: ".5px solid #9f9f9f", mt: 3, mb: 1.5 }}
          />

          <CustomButton
            variant="contained"
            color="success"
            text={t("login.login-with-google")}
            icon={
              <img
                src={googleIcon}
                alt="Google icon"
                className={styles["google-icon"]}
              />
            }
            onClick={loginWithGoogle}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
