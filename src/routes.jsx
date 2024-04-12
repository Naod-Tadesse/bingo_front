import { createBrowserRouter } from "react-router-dom";

import Layout from "./pages/Layout";
import React from "react";
import BingoForm from "./pages/BingoForm";
import Search from "./pages/Search";
import Pattern from "./pages/Pattern";
import ErrorPage from "./pages/ErrorPage";
import CardGenerator from "./pages/CardGenerator";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <BingoForm /> },
      { path: "Search", element: <Search /> },
      { path: "Pattern", element: <Pattern /> },
      { path: "generateCards", element: <CardGenerator /> },
    ],
  },
]);

export default router;
