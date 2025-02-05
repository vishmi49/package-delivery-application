import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import InProgressPackageCards from "../components/InProgressPkgCard";
import ViewAllPackages from "../components/ViewAllPackages";

const HomePage = () => {
  return (
    <>
      <Hero />
      {/* <HomeCards /> */}
      <InProgressPackageCards isHome={true} showInProgress={true} />
      <ViewAllPackages />
    </>
  );
};

export default HomePage;
