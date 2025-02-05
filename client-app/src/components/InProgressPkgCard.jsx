import PackageListing from "./packageListing";
import { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:8000/api/v1";

const InProgressPackageCards = ({isHome = false, showInProgress = false }) => {
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/packageitems/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Ensures cookies are sent with request
        });

        if (!response.ok) {
          throw new Error("Failed to fetch package data");
        }

        const data = await response.json();
        setPackages(data); // Assuming the API returns an array of packages
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const filterInProgressPackages = (packages) => {
    return packages.filter(packageItem => packageItem.currentStatus === 'In Progress');
  };
  let displayedPackages = isHome ? packages.slice(0, 4) : packages;
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

export default InProgressPackageCards;