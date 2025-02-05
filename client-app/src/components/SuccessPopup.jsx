import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const SuccessPopup = ({ isOpen, onClose, message }) => {
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
          <div className="relative bg-white rounded-2xl shadow-xl w-[30%] max-w-lg p-6 text-center">
            <div className="text-green-500 text-6xl mb-4">✔️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{message}</h2>
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg"
              onClick={onClose}
            >
              Awesome!
            </button>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default SuccessPopup;