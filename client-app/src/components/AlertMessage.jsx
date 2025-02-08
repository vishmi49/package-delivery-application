import React from "react";

const AlertMessage = ({ message, type, onClose }) => {
  return (
    <div
      className={`p-3 rounded-lg text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } flex justify-between items-center`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-white font-bold">
        &times;
      </button>
    </div>
  );
}

export default AlertMessage;