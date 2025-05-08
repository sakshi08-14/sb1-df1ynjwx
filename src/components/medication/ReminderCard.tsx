import { CheckCircle, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
  purpose: string;
}

interface ReminderCardProps {
  medication: Medication;
}

const ReminderCard = ({ medication }: ReminderCardProps) => {
  const { confirmMedication } = useApp();

  const handleConfirm = () => {
    confirmMedication(medication.id);
  };

  const isPastDue = () => {
    const now = new Date();
    const [hours, minutes] = medication.time.split(':');
    const [period] = medication.time.split(' ')[1] || 'AM';
    
    let hour = parseInt(hours, 10);
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    
    const medicationTime = new Date();
    medicationTime.setHours(hour, parseInt(minutes, 10), 0);
    
    return now > medicationTime && !medication.taken;
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-md p-4 mb-4 transition-all duration-300 hover:shadow-lg border-l-4 ${
        medication.taken 
          ? 'border-green-500' 
          : isPastDue()
          ? 'border-red-500'
          : 'border-yellow-500'
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{medication.name}</h3>
          <p className="text-gray-600 text-sm">{medication.dosage} - {medication.purpose}</p>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <Clock size={16} className="mr-1" />
            <span>{medication.time}</span>
          </div>
        </div>
        
        <button
          onClick={handleConfirm}
          disabled={medication.taken}
          className={`p-2 rounded-full transition-all duration-300 ${
            medication.taken
              ? 'bg-green-100 cursor-not-allowed'
              : 'bg-white hover:bg-green-100'
          }`}
        >
          <CheckCircle 
            size={24} 
            className={medication.taken ? 'text-green-500' : 'text-gray-400'} 
          />
        </button>
      </div>
      
      {medication.taken && (
        <div className="mt-2 text-sm text-green-600 flex items-center">
          <CheckCircle size={16} className="mr-1" />
          <span>Taken today</span>
        </div>
      )}
      
      {isPastDue() && (
        <div className="mt-2 text-sm text-red-600 font-medium">
          Past due! Please take as soon as possible.
        </div>
      )}
    </div>
  );
};

export default ReminderCard;