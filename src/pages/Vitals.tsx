import { useState } from 'react';
import VitalChart from '../components/vitals/VitalChart';
import { useApp } from '../context/AppContext';
import { Heart, Activity, Droplet, Moon } from 'lucide-react';

const Vitals = () => {
  const { parentData, updateVitals } = useApp();
  const { vitals } = parentData;
  
  const [activeTab, setActiveTab] = useState<string>('daily');
  
  const vitalTypes = [
    { 
      type: 'heartRate',
      name: 'Heart Rate', 
      icon: <Heart className="text-red-500" size={24} />,
      color: '#ef4444',
      current: vitals.heartRate.current,
      unit: vitals.heartRate.unit,
      normal: vitals.heartRate.normal,
      data: vitals.heartRate.history
    },
    { 
      type: 'bloodPressure',
      name: 'Blood Pressure', 
      icon: <Activity className="text-blue-500" size={24} />,
      color: '#3b82f6',
      current: vitals.bloodPressure.current,
      unit: vitals.bloodPressure.unit,
      normal: vitals.bloodPressure.normal,
      data: vitals.bloodPressure.history
    },
    { 
      type: 'glucose',
      name: 'Glucose Level', 
      icon: <Droplet className="text-purple-500" size={24} />,
      color: '#8b5cf6',
      current: vitals.glucose.current,
      unit: vitals.glucose.unit,
      normal: vitals.glucose.normal,
      data: vitals.glucose.history
    },
    { 
      type: 'sleep',
      name: 'Sleep Duration', 
      icon: <Moon className="text-indigo-500" size={24} />,
      color: '#6366f1',
      current: vitals.sleep.current,
      unit: vitals.sleep.unit,
      normal: vitals.sleep.normal,
      data: vitals.sleep.history
    },
  ];
  
  // Mock function to simulate changing current value
  const handleUpdateVital = (type: string, change: number) => {
    const currentVital = vitalTypes.find(v => v.type === type);
    if (currentVital) {
      const newValue = Math.max(0, currentVital.current + change);
      updateVitals(type, newValue);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Vitals Monitoring</h1>
        <p className="text-gray-600">
          Track and review {parentData.name}'s health vitals over time.
        </p>
      </div>
      
      {/* Tab Switcher */}
      <div className="bg-white p-2 rounded-xl shadow-sm flex space-x-2">
        <button 
          onClick={() => setActiveTab('daily')}
          className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 ${
            activeTab === 'daily' 
              ? 'bg-sky-100 text-sky-700 font-medium' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Daily View
        </button>
        <button 
          onClick={() => setActiveTab('weekly')}
          className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 ${
            activeTab === 'weekly' 
              ? 'bg-sky-100 text-sky-700 font-medium' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Weekly Trends
        </button>
        <button 
          onClick={() => setActiveTab('monthly')}
          className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 ${
            activeTab === 'monthly' 
              ? 'bg-sky-100 text-sky-700 font-medium' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Monthly Report
        </button>
      </div>
      
      {/* Vitals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {vitalTypes.map((vital) => (
          <div 
            key={vital.type}
            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <div className="border-b border-gray-100 p-4 flex items-center justify-between">
              <div className="flex items-center">
                {vital.icon}
                <h3 className="text-lg font-semibold text-gray-800 ml-2">{vital.name}</h3>
              </div>
              <div className="flex items-center space-x-1">
                <button 
                  onClick={() => handleUpdateVital(vital.type, -1)}
                  className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors duration-300"
                >
                  <span>-</span>
                </button>
                <div className="w-16 text-center font-semibold">
                  {vital.current} <span className="text-xs text-gray-500">{vital.unit}</span>
                </div>
                <button 
                  onClick={() => handleUpdateVital(vital.type, 1)}
                  className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors duration-300"
                >
                  <span>+</span>
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <VitalChart 
                data={vital.data}
                color={vital.color}
                label={vital.name}
                unit={vital.unit}
                type={vital.type}
              />
              
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Normal range:</span>
                  <span className="text-sm font-medium">{vital.normal}</span>
                </div>
                <div className="mt-2">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-sky-500 rounded-full"
                      style={{ 
                        width: '60%', 
                        backgroundColor: vital.color 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Notes Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Health Notes</h3>
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <p className="text-gray-600">
            Blood pressure has been stable this week. Continue with current medication regimen.
          </p>
          <p className="text-sm text-gray-500 mt-2">Added by Dr. Williams - 3 days ago</p>
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Add a note about vitals..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
          <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-r-lg transition-colors duration-300">
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vitals;