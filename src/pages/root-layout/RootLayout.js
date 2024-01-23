import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../../components/ui/appbar/ResponsiveAppBar";
import ScrollTop from "../../components/ui/scroll-top/ScrollTop";
import LoadingBackdropSpinner from "../../components/ui/loading/LoadingBackdropSpinner";

export default function RootLayout() {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
      <ScrollTop />
      <LoadingBackdropSpinner />
    </>
  );
}
