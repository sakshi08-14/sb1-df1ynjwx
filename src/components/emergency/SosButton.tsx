import { useState } from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

const SosButton = () => {
  const [alertActive, setAlertActive] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const toggleConfirm = () => {
    setConfirmOpen(!confirmOpen);
  };

  const activateAlert = () => {
    setAlertActive(true);
    setConfirmOpen(false);
    
    // Simulate alert resolution after 5 seconds
    setTimeout(() => {
      setAlertActive(false);
    }, 5000);
  };

  const cancelAlert = () => {
    setConfirmOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleConfirm}
        disabled={alertActive}
        className={`flex flex-col items-center justify-center w-full h-40 rounded-xl ${
          alertActive 
            ? 'bg-green-100 cursor-not-allowed' 
            : 'bg-red-100 hover:bg-red-200 animate-bounce'
        } transition-all duration-300`}
      >
        {alertActive ? (
          <>
            <ShieldCheck size={60} className="text-green-500 mb-2" />
            <span className="text-xl font-bold text-green-700">Alert Active</span>
            <p className="text-sm text-green-600 mt-1">Help is on the way!</p>
          </>
        ) : (
          <>
            <AlertTriangle size={60} className="text-red-500 mb-2" />
            <span className="text-xl font-bold text-red-700">SOS</span>
            <p className="text-sm text-red-600 mt-1">Press for emergency help</p>
          </>
        )}
      </button>

      {confirmOpen && !alertActive && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 rounded-xl flex items-center justify-center z-10 animate-fade">
          <div className="bg-white p-4 rounded-lg max-w-xs w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Confirm Emergency Alert</h3>
            <p className="text-sm text-gray-600 mb-4">
              This will alert emergency contacts and caregivers. Continue?
            </p>
            <div className="flex space-x-2">
              <button
                onClick={cancelAlert}
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-300 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={activateAlert}
                className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg font-medium transition-colors duration-300 hover:bg-red-600"
              >
                Activate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SosButton;