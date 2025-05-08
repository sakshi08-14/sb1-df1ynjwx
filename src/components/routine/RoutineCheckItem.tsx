import { Check, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface RoutineItem {
  id: string;
  name: string;
  time: string;
  completed: boolean;
  category: string;
}

interface RoutineCheckItemProps {
  item: RoutineItem;
}

const RoutineCheckItem = ({ item }: RoutineCheckItemProps) => {
  const { toggleRoutineItem } = useApp();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Meal': return 'bg-blue-100 text-blue-800';
      case 'Activity': return 'bg-green-100 text-green-800';
      case 'Healthcare': return 'bg-purple-100 text-purple-800';
      case 'Communication': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm p-4 mb-3 flex items-center justify-between transition-all duration-300 hover:shadow-md ${
        item.completed ? 'border-l-4 border-green-500' : ''
      }`}
    >
      <div className="flex items-center">
        <button
          onClick={() => toggleRoutineItem(item.id)}
          className={`h-6 w-6 rounded-full mr-3 flex items-center justify-center transition-all duration-300 ${
            item.completed 
              ? 'bg-green-500 text-white' 
              : 'border-2 border-gray-300 hover:border-green-500'
          }`}
        >
          {item.completed && <Check size={14} />}
        </button>
        
        <div>
          <h3 className={`font-medium ${item.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
            {item.name}
          </h3>
          <div className="flex items-center mt-1">
            <Clock size={14} className="text-gray-400 mr-1" />
            <span className="text-sm text-gray-500">{item.time}</span>
          </div>
        </div>
      </div>
      
      <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(item.category)}`}>
        {item.category}
      </span>
    </div>
  );
};

export default RoutineCheckItem;