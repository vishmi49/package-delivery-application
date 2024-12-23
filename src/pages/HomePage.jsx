import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import PackageListings from "../components/PackageListings";
import ViewAllPackages from "../components/ViewAllPackages";

const HomePage = () => {
  return (
    <>
      <Hero />
      <HomeCards />
      <PackageListings isHome={true} showInProgress={true} />
      <ViewAllPackages />
    </>
  );
};

export default HomePage;
