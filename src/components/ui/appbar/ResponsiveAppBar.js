import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../../assets/images/logo.png";
import Flags from "../flags/appbar/Flags";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../auth/auth-context/AuthProvider";
import LoginSignUpButtons from "../button/LoginSignUpButtons";
import styles from "./ResponsiveAppBar.module.css";

export default function ResponsiveAppBar() {
  const { user, isUserEmailVerified } = useAuth();
  const { t } = useTranslation();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const pages =
    user && isUserEmailVerified
      ? [
          {
            name: t("appbar-menus.projects"),
            path: "projects",
          },
          {
            name: t("appbar-menus.calendar"),
            path: "calendar",
          },
          {
            name: t("appbar-menus.dashboard"),
            path: "dashboard",
          },
        ]
      : null;

  function handleOpenNavMenu(event) {
    setAnchorElNav(event.currentTarget);
  }

  function handleCloseNavMenu() {
    setAnchorElNav(null);
  }

  return (
    <AppBar position="sticky">
      <Container maxWidth="100%" className={styles.appbar}>
        <Toolbar disableGutters>
          <Typography
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            <NavLink to="/" end>
              <img src={logo} alt="logo" className={styles.logo} />
            </NavLink>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {!isUserEmailVerified ? (
                <div className={styles["login-signup-container-mobile"]}>
                  <LoginSignUpButtons handleCloseNavMenu={handleCloseNavMenu} />
                </div>
              ) : (
                pages.map((page) => (
                  <NavLink
                    key={page.name}
                    to={page.path}
                    end
                    className={styles.linksmobile}
                  >
                    <MenuItem
                      onClick={handleCloseNavMenu}
                      className={styles.mobilemenuitem}
                    >
                      {page.name}
                    </MenuItem>
                  </NavLink>
                ))
              )}
            </Menu>
          </Box>

          <Typography
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            <NavLink to="/" end>
              <img src={logo} alt="logo" className={styles["logo-mobile"]} />
            </NavLink>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {!isUserEmailVerified ? (
              <div className={styles["login-signup-container"]}>
                <LoginSignUpButtons />
              </div>
            ) : (
              pages.map((page) => (
                <NavLink
                  to={page.path}
                  key={page.name}
                  end
                  className={styles.links}
                >
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </NavLink>
              ))
            )}
          </Box>

          <Flags />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
