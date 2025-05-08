import { useState } from 'react';
import { BellRing, Globe, Moon, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const SettingsForm = () => {
  const { parentData } = useApp();
  const [settings, setSettings] = useState(parentData.settings);
  const [isSaved, setIsSaved] = useState(false);
  
  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings logic would go here
    setIsSaved(true);
    
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };
  
  const timeZones = [
    "Pacific Time (PT)",
    "Mountain Time (MT)",
    "Central Time (CT)",
    "Eastern Time (ET)"
  ];
  
  const languages = ["English", "Spanish", "French", "Chinese"];
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Settings</h3>
      
      <div className="space-y-6">
        {/* Notifications */}
        <div className="pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BellRing size={20} className="text-sky-500 mr-3" />
              <span className="font-medium text-gray-700">Notifications</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={settings.notifications}
                onChange={() => handleToggle('notifications')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-1 ml-8">
            Receive notifications for medication reminders and health alerts
          </p>
        </div>
        
        {/* Dark Mode */}
        <div className="pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Moon size={20} className="text-sky-500 mr-3" />
              <span className="font-medium text-gray-700">Dark Mode</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={settings.darkMode}
                onChange={() => handleToggle('darkMode')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-1 ml-8">
            Use a darker color scheme, easier on the eyes at night
          </p>
        </div>
        
        {/* Timezone */}
        <div className="pb-4 border-b border-gray-100">
          <div className="flex items-center mb-3">
            <Globe size={20} className="text-sky-500 mr-3" />
            <span className="font-medium text-gray-700">Time Zone</span>
          </div>
          <select 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all duration-300"
            value={settings.timezone}
            onChange={(e) => handleChange('timezone', e.target.value)}
          >
            {timeZones.map(zone => (
              <option key={zone} value={zone}>{zone}</option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1 ml-8">
            This affects medication times and schedule reminders
          </p>
        </div>
        
        {/* Language */}
        <div className="pb-4 border-b border-gray-100">
          <div className="flex items-center mb-3">
            <Globe size={20} className="text-sky-500 mr-3" />
            <span className="font-medium text-gray-700">Language</span>
          </div>
          <select 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all duration-300"
            value={settings.language}
            onChange={(e) => handleChange('language', e.target.value)}
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
        
        {/* Emergency Contacts */}
        <div className="pb-4">
          <div className="flex items-center mb-3">
            <Users size={20} className="text-sky-500 mr-3" />
            <span className="font-medium text-gray-700">Emergency Contacts</span>
          </div>
          
          <div className="space-y-3">
            {settings.emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-700">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.phone}</p>
                </div>
                <button 
                  type="button"
                  className="text-sm text-sky-600 hover:text-sky-800 transition-colors duration-300"
                >
                  Edit
                </button>
              </div>
            ))}
            
            <button 
              type="button"
              className="w-full p-2 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-sky-600 hover:border-sky-400 transition-all duration-300"
            >
              + Add New Contact
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-between">
        <button
          type="submit"
          className="py-2 px-6 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium transition-all duration-300"
        >
          Save Changes
        </button>
        
        {isSaved && (
          <span className="text-green-600 animate-fade">
            Settings saved successfully!
          </span>
        )}
      </div>
    </form>
  );
};

export default SettingsForm;