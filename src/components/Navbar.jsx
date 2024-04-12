import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar({ total }) {
  const [activeItem, setActiveItem] = useState(() => {
    // Retrieve the active item from localStorage or set it to an empty string if not found
    return localStorage.getItem("activeItem") || "";
  });
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const hideNavbar = () => {
    setIsNavbarVisible(false);
  };

  const showNavbar = () => {
    setIsNavbarVisible(true);
  };

  const [links, setLinks] = useState([
    "Form",
    "Pattern",
    "Search",
    "generateCards",
  ]);

  useEffect(() => {
    // Update localStorage with the active item whenever it changes
    localStorage.setItem("activeItem", activeItem);
  }, [activeItem]);

  return (
    <div
      onMouseLeave={hideNavbar}
      onMouseOver={showNavbar}
      className={`bg-neutral-800 border-b-4 font-bold text-white flex justify-between items-center border-red-600 transition duration-300 transform ${
        isNavbarVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0"
      }`}
    >
      <ul className="flex-grow flex justify-center py-3 text-xl gap-20">
        {links.map((item, index) => (
          <li
            key={index}
            className={`hover:text-red-400 cursor-pointer ${
              activeItem === item ? "border-b-4 border-red-400" : ""
            }`}
            onClick={() => setActiveItem(item)}
          >
            {item === "Form" ? (
              <Link to={`/`}>{item}</Link>
            ) : (
              <Link to={`/${item.toLowerCase()}`}>{item}</Link>
            )}
          </li>
        ))}
      </ul>
      <div className="bg-red-500 px-4 py-2 text-white rounded-full">
        total cards{" "}
        <span className="bg-red-900 rounded-full py-2 px-4">{total}</span>{" "}
        {/* Adjusted padding */}
      </div>
    </div>
  );
}

export default Navbar;
