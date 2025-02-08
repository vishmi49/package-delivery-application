import Hero from "../components/Hero";
import InProgressPackageCards from "../components/InProgressPkgCard";
import ViewAllPackages from "../components/ViewAllPackages";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGlobalContext } from "../../context/globalContext";

const HomePage = () => {
  const { isAuthenticated, loading } = useGlobalContext();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!loading && !isAuthenticated) {
  //     console.log("User not authenticated in HomePage");
  //     navigate("/signin");
  //   }
  // }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

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