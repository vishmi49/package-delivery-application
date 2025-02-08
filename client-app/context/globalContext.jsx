import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const GlobalContext = createContext();

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export const GlobalContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [auth0User, setAuth0User] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/v1/check-auth");
        console.log(res.data);
        if (res.data.isAuthenticated) {
          setIsAuthenticated(true);
          setAuth0User(res.data.user);
        } else {
          setIsAuthenticated(false);
          setAuth0User(null);
        }
      } catch (error) {
        console.log("Error checking auth", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = () => {
    setIsAuthenticated(false);
    setAuth0User(null);
    setUserProfile({});
    localStorage.removeItem('authToken');
    // Optionally, you can clear cookies or make a logout request to the server here
  };

  return (
    <GlobalContext.Provider value={{ isAuthenticated, setIsAuthenticated, auth0User, setAuth0User, userProfile, setUserProfile, loading, logout }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);