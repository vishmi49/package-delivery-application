import Hero from "../components/Hero";
import { useGlobalContext } from "../../context/globalContext";
import InProgressPackageCards from "../components/InProgressPkgCard";
import ViewAllPackages from "../components/ViewAllPackages";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {

  return (
    <>
      <Hero />
      <InProgressPackageCards isHome={true} showInProgress={true} />
      <ViewAllPackages />
    </>
  );
};

export default HomePage;
