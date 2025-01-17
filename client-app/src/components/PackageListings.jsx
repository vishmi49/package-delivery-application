import PackageListing from "./packageListing";
import packages from "../data.json";

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
          {isHome ? "In-Progress Packages" : "All Packages"}
        </h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Tracking Number</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Delivery Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Delivery Time</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Current Status</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Reschedule</th>
              </tr>
            </thead>
            <tbody>
              {displayedPackages.map((packageItem) => (
                <tr key={packageItem.id} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{packageItem.deliveryDetails.trackingNumber}</td>
                  <td className="border border-gray-300 px-4 py-2">{packageItem.deliveryDetails.deliveryDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{packageItem.deliveryDetails.deliveryTime}</td>
                  <td className="border border-gray-300 px-4 py-2 text-orange-700">{packageItem.currentStatus}</td>
                  <td className="border border-gray-300 px-4 py-2">{packageItem.description}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">
                      Reschedule
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PackageListings;
