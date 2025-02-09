import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import AlertMessage from "./AlertMessage";

const API_BASE_URL = "http://localhost:8000/api/v1";

const RescheduleModal = ({ isOpen, onClose, packageItem, onReschedule }) => {
  if (!packageItem) return null; // Prevents errors if packageItem is null

  const [selectedDate, setSelectedDate] = useState(packageItem.deliveryDetails.deliveryDate);
  const [selectedTime, setSelectedTime] = useState(packageItem.deliveryDetails.deliveryTime);
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedDate(packageItem.deliveryDetails.deliveryDate);
      setSelectedTime(packageItem.deliveryDetails.deliveryTime);
      setInstructions("");
      setAlert(null); // Clear alert when modal opens
    }
  }, [isOpen, packageItem.id]);

  const handleSave = async () => {
    setLoading(true);
    setAlert(null); // Clear any existing alert before the request

    try {
      const response = await fetch(`${API_BASE_URL}/packageitems/${packageItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensures cookies are sent with the request
        body: JSON.stringify({
          deliveryDate: selectedDate,
          deliveryTime: selectedTime,
          additionalInstructions: instructions,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setAlert({ message: "Package item updated successfully", type: "success" });
        onReschedule(data.packageItem);
        setTimeout(() => {
          setAlert(null);
          onClose();
          window.location.reload();
        }, 20); // Auto-close modal after success message
        
      } else {
        setAlert({ message: data.message || "Failed to update package item", type: "error" });
      }
    } catch (error) {
      setAlert({ message: "An error occurred while updating the package item", type: "error" });
    }
    setLoading(false);
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

            {alert && <AlertMessage message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Select Date:</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg p-3"
                  value={selectedDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    let selectedDate = new Date(e.target.value + 'T12:00:00'); 
                    selectedDate.setDate(selectedDate.getDate() + 1); 
                    const dayOfWeek = selectedDate.getUTCDay();
                    if (dayOfWeek === 0) { // 0 represents Sunday
                      setAlert({ message: "Sundays are not available for delivery", type: "error" });
                      return;
                    }
                    setSelectedDate(selectedDate.toISOString().split('T')[0]); 
                  }}
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
