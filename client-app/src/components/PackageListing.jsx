import { useState } from "react";
import { FaShippingFast } from "react-icons/fa";
import RescheduleModal from "./RescheduleModal";

const PackageListing = ({ packageItem }) => {
  const [showModal, setShowModal] = useState(false);
  const [updatedPackage, setUpdatedPackage] = useState(packageItem);

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="mb-6">
        <div className="text-gray-600 my-2">{updatedPackage.priority}</div>
        <h3 className="text-xl font-bold">{updatedPackage.packageName}</h3>
      </div>
      <div className="mb-5">{updatedPackage.description}</div>
      <h3 className="text-indigo-500 mb-2">{updatedPackage.deliveryDetails.deliveryDate}</h3>
      <div className="border border-gray-100 mb-5"></div>
      <div className="flex flex-col lg:flex-row justify-between mb-4">
        <div className="text-orange-700 mb-3">
          <FaShippingFast className="inline text-lg mb-1 mr-1" />
          {updatedPackage.currentStatus}
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg"
        >
          Reschedule
        </button>
      </div>
      {showModal && (
        <RescheduleModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          packageItem={updatedPackage}
          onReschedule={(newData) => setUpdatedPackage(newData)}
        />
      )}
    </div>
  );
};

export default PackageListing;