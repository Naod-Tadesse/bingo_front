import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
// import "./App.css";

const Layout = () => {
  const [total, setTotal] = useState(0);

  const fetchTotalCards = () => {
    const endpoint = "http://localhost:5000/api/bingos"; // Replace with your actual server endpoint
    axios
      .get(endpoint)
      .then((response) => {
        setTotal(response.data.total);
      })
      .catch((error) => {
        console.log("error");
      });
  };

  useEffect(() => {
    fetchTotalCards();
  }, []);

  return (
    <div className="bg-neutral-800 h-screen">
      <Navbar total={total} />
      <div>
        <Outlet context={[fetchTotalCards]} />
      </div>
    </div>
  );
};

export default Layout;
