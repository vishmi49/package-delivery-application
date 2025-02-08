import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const GlobalContext = createContext();

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export const GlobalContextProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [auth0User, setAuth0User] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/v1/check-auth");
        console.log(res.data);
        setIsAuthenticated(res.data.isAuthenticated);
        setAuth0User(res.data.user);
      } catch (error) {
        console.log("Error checking auth", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <GlobalContext.Provider value={{ isAuthenticated, auth0User, loading }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
