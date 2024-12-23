import { useState } from "react";
import { FaShippingFast } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PackageListing = ({packageItem}) => {

  return (
    <div className="bg-white rounded-xl shadow-md relative">
              <div className="p-4">
                <div className="mb-6">
                  <div className="text-gray-600 my-2">{packageItem.priority}</div>
                  <h3 className="text-xl font-bold">{packageItem.packageName}</h3>
                </div>

                <div className="mb-5">
                  {packageItem.description}
                </div>
  
                <h3 className="text-indigo-500 mb-2">{packageItem.additionalInstructions}</h3>

                <div className="border border-gray-100 mb-5"></div>

                <div className="flex flex-col lg:flex-row justify-between mb-4">
                  <div className="text-orange-700 mb-3">
                    <FaShippingFast className='inline text-lg mb-1 mr-1' />
                    {packageItem.currentStatus}
                  </div>
                  <Link
                    to={`/package/${packageItem.id}`}
                    className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>

  )
}

export default PackageListing