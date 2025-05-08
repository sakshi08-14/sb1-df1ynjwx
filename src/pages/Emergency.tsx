import SosButton from '../components/emergency/SosButton';
import { useApp } from '../context/AppContext';
import { PhoneCall, User, AlertCircle } from 'lucide-react';

const Emergency = () => {
  const { parentData } = useApp();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Emergency Assistance</h1>
        <p className="text-gray-600">
          Quick access to emergency services and alert history for {parentData.name}.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SOS Button */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Emergency Alert Button</h3>
            <p className="text-gray-600 mb-6">
              Press the SOS button below to immediately alert emergency contacts and caregivers.
              This will send notifications and make automated calls.
            </p>
            
            <SosButton />
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle size={20} className="text-yellow-500 mr-2 mt-0.5" />
                <p className="text-sm text-yellow-700">
                  Use this button only in genuine emergency situations. All alerts are logged and emergency
                  services may be dispatched to {parentData.name}'s location.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Emergency Contacts */}
        <div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Emergency Contacts</h3>
            
            <div className="space-y-4">
              {parentData.settings.emergencyContacts.map((contact, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-sky-200 transition-all duration-300">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-500 mr-3">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{contact.name}</p>
                      <p className="text-sm text-gray-500">{contact.phone}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button className="flex items-center text-sm text-sky-600 hover:text-sky-800 transition-colors duration-300">
                      <PhoneCall size={16} className="mr-1" />
                      Call directly
                    </button>
                  </div>
                </div>
              ))}
              
              <button className="w-full py-2 px-4 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-sky-600 hover:border-sky-400 transition-all duration-300">
                + Add New Contact
              </button>
            </div>
          </div>
        </div>
        
        {/* Alert History */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Alert History</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-left">
                    <th className="py-3 px-4 text-sm font-medium text-gray-600">Type</th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600">Message</th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600">Time</th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {parentData.alertHistory.map((alert) => (
                    <tr key={alert.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-300">
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          alert.type === 'Medication' ? 'bg-blue-100 text-blue-800' :
                          alert.type === 'Fall Detection' ? 'bg-red-100 text-red-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {alert.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">{alert.message}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">{alert.time}</td>
                      <td className="py-3 px-4">
                        {alert.resolved ? (
                          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            Resolved
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {parentData.alertHistory.length === 0 && (
              <div className="py-8 text-center text-gray-500">
                No alerts have been triggered
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;