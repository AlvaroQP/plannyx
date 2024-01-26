import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../../components/ui/appbar/ResponsiveAppBar";
import ScrollTop from "../../components/ui/scroll-top/ScrollTop";
import LoadingBackdropSpinner from "../../components/ui/loading/LoadingBackdropSpinner";
import { useAlert } from "../../context/alerts/AlertProvider";
import CustomAlert from "../../components/ui/alert/CustomAlert";
import { useAuth } from "../../auth/auth-context/AuthProvider";

export default function RootLayout() {
  const { alert } = useAlert();
  const { isUserEmailVerified } = useAuth();

  return (
    <>
      {!isUserEmailVerified && <ResponsiveAppBar />}
      {alert && <CustomAlert />}
      <Outlet />
      <ScrollTop />
      <LoadingBackdropSpinner />
    </>
  );
}
