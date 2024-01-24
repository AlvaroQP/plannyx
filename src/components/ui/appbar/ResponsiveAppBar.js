import * as React from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../../assets/images/logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Flags from "../flags/Flags";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../auth/auth-context/AuthProvider";
import styles from "./ResponsiveAppBar.module.css";

export default function ResponsiveAppBar() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const pages = user
    ? [
        {
          name: t("appbar-menus.projects"),
          path: "projects",
        },
      ]
    : [
        {
          name: t("appbar-menus.login"),
          path: "/login",
        },
        {
          name: t("appbar-menus.sign-up"),
          path: "/signup",
        },
      ];

  const settings = [t("appbar-menus.dashboard"), t("appbar-menus.logout")];

  function handleOpenNavMenu(event) {
    setAnchorElNav(event.currentTarget);
  }

  function handleOpenUserMenu(event) {
    setAnchorElUser(event.currentTarget);
  }

  function handleCloseNavMenu() {
    setAnchorElNav(null);
  }

  function handleCloseUserMenu() {
    setAnchorElUser(null);
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
              {pages.map((page) => (
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
              ))}
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
            {pages.map((page) => (
              <NavLink to={page.path} end className={styles.links}>
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              </NavLink>
            ))}
          </Box>

          <Flags />

          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={t("appbar-menus.settings")}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircleIcon
                    sx={{ color: "#fff", fontSize: "2.5rem" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem key={index} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
