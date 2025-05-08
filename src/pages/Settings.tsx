import SettingsForm from '../components/settings/SettingsForm';
import { useApp } from '../context/AppContext';

const Settings = () => {
  const { parentData } = useApp();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Settings</h1>
        <p className="text-gray-600">
          Manage your preferences and settings for {parentData.name}'s care.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Main Settings Form */}
        <SettingsForm />
        
        {/* Account Info */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Account Information</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input 
                  type="text" 
                  value="Michael Wilson"
                  disabled
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value="michael.wilson@example.com"
                  disabled
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 cursor-not-allowed"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent's Information</label>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-sky-200 flex items-center justify-center text-sky-700 font-medium text-lg mr-4">
                    {parentData.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{parentData.name}</p>
                    <p className="text-sm text-gray-500">Age: {parentData.age}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <button className="text-sky-600 hover:text-sky-800 transition-colors duration-300">
                Edit account information
              </button>
            </div>
          </div>
        </div>
        
        {/* Data and Privacy */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Data & Privacy</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Health Data Storage</h4>
              <p className="text-sm text-gray-600 mb-3">
                CareNest securely stores health data for 12 months. You can export or delete this data at any time.
              </p>
              <div className="flex space-x-3">
                <button className="text-sm text-sky-600 hover:text-sky-800 transition-colors duration-300">
                  Export data
                </button>
                <button className="text-sm text-red-600 hover:text-red-800 transition-colors duration-300">
                  Delete data
                </button>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Privacy Settings</h4>
              <p className="text-sm text-gray-600 mb-3">
                Control who can access information about {parentData.name}'s care and health data.
              </p>
              <button className="text-sm text-sky-600 hover:text-sky-800 transition-colors duration-300">
                Manage access permissions
              </button>
            </div>
          </div>
        </div>
        
        {/* Danger Zone */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-red-100">
          <h3 className="text-xl font-semibold text-red-800 mb-6">Danger Zone</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Deactivate Account</p>
                <p className="text-sm text-gray-600">
                  Temporarily disable this care profile
                </p>
              </div>
              <button className="py-2 px-4 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-all duration-300">
                Deactivate
              </button>
            </div>
            
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Delete Account</p>
                <p className="text-sm text-gray-600">
                  Permanently delete all data related to {parentData.name}
                </p>
              </div>
              <button className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;