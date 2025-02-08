import Hero from "../components/Hero";
import { useGlobalContext } from "../../context/globalContext";
import InProgressPackageCards from "../components/InProgressPkgCard";
import ViewAllPackages from "../components/ViewAllPackages";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  const { isAuthenticated } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("User not authenticated in HomePage");
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Hero />
      <InProgressPackageCards isHome={true} showInProgress={true} />
      <ViewAllPackages />
    </>
  );
};

export default HomePage;