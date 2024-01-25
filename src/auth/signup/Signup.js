import React, { useState } from "react";
import CustomButton from "../../components/ui/button/CustomButton";
import { TextField } from "@mui/material";
import { useAuth } from "../auth-context/AuthProvider";
import AuthFormAlert from "../../components/ui/alert/AuthFormAlert";
import passwordRegex from "../../utils/passwordRegex";
import Box from "@mui/material/Box";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import { useLoading } from "../../context/loading/LoadingProvider";
import { useTranslation } from "react-i18next";
import CustomDialog from "../../components/ui/dialog/CustomDialog";
import CustomDivider from "../../components/ui/divider/CustomDivider";
import styles from "./Signup.module.css";

export default function Signup({ handleCloseSignUp }) {
  const { signup } = useAuth();
  const { setIsLoading } = useLoading();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyEmailDialog, setShowVerifyEmailDialog] = useState(false);
  const { t } = useTranslation();

  async function handleSignup(e) {
    e.preventDefault();
    setIsLoading(true);

    if (password !== passwordConfirmation) {
      setIsLoading(false);
      return setError(t("signup.passwords-do-not-match"));
    } else if (!passwordRegex.test(password)) {
      setIsLoading(false);
      return setError(t("signup.password-requirements"));
    }

    try {
      await signup(email, password, displayName);
      handleOpenVerifyEmailDialog();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError(t("signup.email-already-in-use"));
      } else {
        setError(t("signup.could-not-create-account"));
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleOpenVerifyEmailDialog() {
    setShowVerifyEmailDialog(true);
  }

  function handleCloseVerifyEmailDialog() {
    setShowVerifyEmailDialog(false);
    handleCloseSignUp();
  }

  const verifyEmailDialog = (
    <CustomDialog
      open={showVerifyEmailDialog}
      handleClose={handleCloseVerifyEmailDialog}
      title={t("signup.verify-email")}
      description={t("signup.verify-email-description")}
      acceptText={t("button.done")}
      cancelText={t("button.cancel")}
      acceptAction={handleCloseVerifyEmailDialog}
    />
  );

  return (
    <>
      {!showVerifyEmailDialog && (
        <Dialog
          open={true}
          onClose={handleCloseSignUp}
          sx={{
            "& .MuiBackdrop-root": { backgroundColor: "rgba(0, 0, 0, 0.85)" },
          }}
        >
          <DialogContent
            className={styles["dialog-content"]}
            sx={{ padding: 0 }}
          >
            <form onSubmit={handleSignup} className={styles.form}>
              <Box display="flex" justifyContent="flex-end">
                <IconButton edge="end" onClick={handleCloseSignUp}>
                  <CloseIcon sx={{ color: "#fff" }} />
                </IconButton>
              </Box>
              <h2 className={styles["form-title"]}>{t("signup.title")}</h2>
              <CustomDivider />

              {error && <AuthFormAlert severity="error" message={error} />}

              <TextField
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                label={t("signup.field.name")}
                variant="filled"
                required
                sx={{ backgroundColor: "white", mt: 2 }}
              />
              <TextField
                type="email"
                value={email}
                label={t("signup.field.email")}
                variant="filled"
                required
                sx={{ backgroundColor: "white", mt: 2 }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <TextField
                type={showPassword ? "text" : "password"}
                value={password}
                label={t("signup.field.password")}
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
              <TextField
                type={showPassword ? "text" : "password"}
                value={passwordConfirmation}
                label={t("signup.field.confirm-password")}
                variant="filled"
                required
                sx={{ backgroundColor: "white", mb: 3 }}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
              <CustomButton
                variant="contained"
                color="success"
                text={t("button.sign-up")}
                icon={<PersonAddIcon />}
                type="submit"
              />
              <br />
            </form>
          </DialogContent>
        </Dialog>
      )}

      {verifyEmailDialog}
    </>
  );
}
