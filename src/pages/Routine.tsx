import { useState } from 'react';
import RoutineCheckItem from '../components/routine/RoutineCheckItem';
import { useApp } from '../context/AppContext';
import { Calendar, CheckCircle2, Filter, Plus } from 'lucide-react';

const Routine = () => {
  const { parentData } = useApp();
  const [selectedDay, setSelectedDay] = useState('Today');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  
  const days = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const categories = ['All', 'Meal', 'Activity', 'Healthcare', 'Communication'];
  
  // Apply filters
  const filteredItems = parentData.routineItems.filter(item => {
    if (categoryFilter === 'All') return true;
    return item.category === categoryFilter;
  });
  
  const completedCount = filteredItems.filter(item => item.completed).length;
  const totalCount = filteredItems.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Daily Routine</h1>
        <p className="text-gray-600">
          Manage and track {parentData.name}'s daily activities and routine tasks.
        </p>
      </div>
      
      {/* Day Selection */}
      <div className="bg-white rounded-xl shadow-sm p-2 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {days.map(day => (
            <button 
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`py-2 px-4 rounded-lg transition-all duration-300 whitespace-nowrap ${
                selectedDay === day 
                  ? 'bg-sky-100 text-sky-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Daily Progress</h3>
            <p className="text-sm text-gray-500">
              {completedCount} of {totalCount} tasks completed
            </p>
          </div>
          <div className="flex items-center">
            <CheckCircle2 
              size={20} 
              className={completedCount === totalCount ? 'text-green-500' : 'text-gray-300'} 
            />
            <span className="ml-2 font-medium">
              {Math.round(progressPercentage)}%
            </span>
          </div>
        </div>
        
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Filters and Categories */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Routine Tasks</h3>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-sm text-gray-600 hover:text-sky-600 transition-colors duration-300"
          >
            <Filter size={16} className="mr-1" />
            Filter
          </button>
        </div>
        
        {showFilters && (
          <div className="mt-4 flex flex-wrap gap-2 animate-fade">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`py-1 px-3 text-sm rounded-full transition-all duration-300 ${
                  categoryFilter === category
                    ? 'bg-sky-100 text-sky-700 font-medium'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Routine List */}
      <div className="space-y-1">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <RoutineCheckItem key={item.id} item={item} />
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <Calendar size={40} className="mx-auto mb-2 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No tasks found</h3>
            <p className="text-gray-600 mb-4">
              {categoryFilter !== 'All' 
                ? `No ${categoryFilter.toLowerCase()} tasks scheduled for ${selectedDay.toLowerCase()}.` 
                : `No tasks scheduled for ${selectedDay.toLowerCase()}.`}
            </p>
            <button className="py-2 px-4 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors duration-300">
              Add New Task
            </button>
          </div>
        )}
      </div>
      
      {/* Add New Button */}
      {filteredItems.length > 0 && (
        <div className="fixed bottom-6 right-6">
          <button className="h-14 w-14 rounded-full bg-sky-500 hover:bg-sky-600 text-white shadow-lg flex items-center justify-center transition-all duration-300">
            <Plus size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Routine;