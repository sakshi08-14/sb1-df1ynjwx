import { Activity, Heart, Droplet, Moon } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const HealthSummary = () => {
  const { parentData } = useApp();
  const { vitals } = parentData;

  const vitalItems = [
    { 
      icon: <Heart className="text-red-500" size={20} />, 
      name: 'Heart Rate', 
      value: vitals.heartRate.current, 
      unit: vitals.heartRate.unit,
      normal: vitals.heartRate.normal
    },
    { 
      icon: <Activity className="text-blue-500" size={20} />, 
      name: 'Blood Pressure', 
      value: vitals.bloodPressure.current, 
      unit: vitals.bloodPressure.unit,
      normal: vitals.bloodPressure.normal
    },
    { 
      icon: <Droplet className="text-purple-500" size={20} />, 
      name: 'Glucose', 
      value: vitals.glucose.current, 
      unit: vitals.glucose.unit,
      normal: vitals.glucose.normal
    },
    { 
      icon: <Moon className="text-indigo-500" size={20} />, 
      name: 'Sleep', 
      value: vitals.sleep.current, 
      unit: vitals.sleep.unit,
      normal: vitals.sleep.normal
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {vitalItems.map((item) => (
        <div key={item.name} className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:shadow-sm">
          <div className="flex items-center mb-1">
            {item.icon}
            <span className="ml-1 text-sm font-medium text-gray-700">{item.name}</span>
          </div>
          <div className="mt-1">
            <div className="text-lg font-semibold">
              {item.value} <span className="text-xs font-normal text-gray-500">{item.unit}</span>
            </div>
            <div className="text-xs text-gray-500">Normal: {item.normal}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HealthSummary;