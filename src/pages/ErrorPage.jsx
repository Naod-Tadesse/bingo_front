import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Navbar from "../components/Navbar";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="bg-neutral-800 h-screen">
      <Navbar />
      <div className="p-5 text-white flex flex-col items-center justify-center">
        <h1>Oops...</h1>
        <p>
          {isRouteErrorResponse(error)
            ? "this page does not exitst"
            : "Unexpected error occured."}
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
