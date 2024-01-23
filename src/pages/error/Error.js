import ResponsiveAppBar from "../../components/ui/appbar/ResponsiveAppBar";
import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  let title;
  let errorMessage;

  if (error.status === 404) {
    title = "Not found!";
    errorMessage = "Could not find resource or page.";
  }

  if (error.status === 500) {
    title = "An error occurred!";
    errorMessage = error.data.message;
  }

  return (
    <>
      <ResponsiveAppBar />
      <main>
        <h1> {title} </h1>
        <p> {errorMessage} </p>
      </main>
    </>
  );
}
