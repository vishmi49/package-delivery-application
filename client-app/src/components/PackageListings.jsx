import PackageListing from "./packageListing";
import packages from "../packages.json";

const PackageListings = ({isHome = false, showInProgress = false }) => {

  const filterInProgressPackages = (packages) => {
    return packages.filter(packageItem => packageItem.currentStatus === 'In Progress');
  };
  let displayedPackages = isHome ? packages.slice(0, 3) : packages;
  if(showInProgress) {
    displayedPackages = filterInProgressPackages(displayedPackages);
  }
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
         { isHome ? 'In-Progress Packages' : 'All Packages' } 
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedPackages.map((packageItem) => (
            <PackageListing key={packageItem.id} packageItem={packageItem} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackageListings;
