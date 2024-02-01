import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../../components/ui/appbar/ResponsiveAppBar";
import ScrollTop from "../../components/ui/scroll-top/ScrollTop";
import LoadingBackdropSpinner from "../../components/ui/loading/LoadingBackdropSpinner";
import AuthCheckBackdropSpinner from "../../components/ui/loading/AuthCheckBackdropSpinner";
import { useAlert } from "../../context/alerts/AlertProvider";
import CustomAlert from "../../components/ui/alert/CustomAlert";
import { useAuth } from "../../auth/auth-context/AuthProvider";

export default function RootLayout() {
  const { alert } = useAlert();
  const { isUserEmailVerified, isAuthChecking, isLoadingEmailVerification } =
    useAuth();

  return (
    <>
      {!isUserEmailVerified &&
        !isAuthChecking &&
        !isLoadingEmailVerification && <ResponsiveAppBar />}
      {alert && <CustomAlert />}
      <Outlet />
      <ScrollTop />
      <LoadingBackdropSpinner />
      <AuthCheckBackdropSpinner />
    </>
  );
}
