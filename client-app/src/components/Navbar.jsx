import { NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/globalContext";
import { useState } from "react";
import axios from "axios";
import logo from "../assets/images/logo3.png";

const Navbar = () => {
  const { isAuthenticated, auth0User, logout } = useGlobalContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("/api/v1/logout");
      logout();
      navigate("/signin");
    } catch (error) {
      console.log("Error logging out", error);
    }
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-11 w-auto" src={logo} alt="packages" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                Package Tracker
              </span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
                <NavLink to="/packages" className={linkClass}>
                  Packages
                </NavLink>
              </div>
            </div>
          </div>
          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
              >
                {auth0User?.name}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;