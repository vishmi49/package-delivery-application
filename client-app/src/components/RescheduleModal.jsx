import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
const API_BASE_URL = "http://localhost:8000/api/v1";

const RescheduleModal = ({ isOpen, onClose, packageItem, onReschedule }) => {
  const [selectedDate, setSelectedDate] = useState(packageItem.deliveryDetails.deliveryDate);
  const [selectedTime, setSelectedTime] = useState(packageItem.deliveryDetails.deliveryTime);
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSelectedDate(packageItem.deliveryDetails.deliveryDate);
      setSelectedTime(packageItem.deliveryDetails.deliveryTime);
      setInstructions("");
    }
  }, [isOpen, packageItem]);

  const handleSave = async () => {

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/packageitems/${packageItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
         },
        
        body: JSON.stringify({
          deliveryDate: selectedDate,
          deliveryTime: selectedTime,
          additionalInstructions: instructions,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Package item updated successfully");
        onReschedule(data.packageItem);
      } else {
        alert(data.message || "Failed to update package item");
      }
    } catch (error) {
      alert("Error updating package item");
    }
    setLoading(false);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 flex items-center justify-center" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-lg transition-opacity" />

        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition-opacity ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="relative bg-white rounded-2xl shadow-xl w-[50%] max-w-2xl p-8">
            <h1 className="text-3xl font-bold text-indigo-600 mb-4 text-center">
              Reschedule Delivery
            </h1>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Select Date:</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg p-3"
                  value={selectedDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Select Time:</label>
                <input
                  type="time"
                  className="w-full border border-gray-300 rounded-lg p-3"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Additional Instructions:</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-3 h-24"
                  placeholder="Add any special instructions..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-lg"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default RescheduleModal;