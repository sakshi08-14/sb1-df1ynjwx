import { useState } from 'react';
import ReminderCard from '../components/medication/ReminderCard';
import { useApp } from '../context/AppContext';
import { Clock, Plus, CheckCircle, Search } from 'lucide-react';

const Medication = () => {
  const { parentData } = useApp();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter medications based on status
  const filteredMedications = parentData.medications.filter(med => {
    if (filter === 'taken') return med.taken;
    if (filter === 'pending') return !med.taken;
    return true;
  }).filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    med.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get statistics
  const totalMeds = parentData.medications.length;
  const takenMeds = parentData.medications.filter(med => med.taken).length;
  const pendingMeds = totalMeds - takenMeds;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Medication Management</h1>
        <p className="text-gray-600">
          Track and manage {parentData.name}'s medication schedule.
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center">
          <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-500 mr-4">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Medications</p>
            <p className="text-xl font-semibold text-gray-800">{totalMeds}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-4">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Taken Today</p>
            <p className="text-xl font-semibold text-gray-800">{takenMeds}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center">
          <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 mr-4">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-xl font-semibold text-gray-800">{pendingMeds}</p>
          </div>
        </div>
      </div>
      
      {/* Filter and Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex space-x-2">
          <button 
            onClick={() => setFilter('all')}
            className={`py-2 px-4 rounded-lg transition-all duration-300 ${
              filter === 'all' 
                ? 'bg-sky-100 text-sky-700 font-medium' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={`py-2 px-4 rounded-lg transition-all duration-300 ${
              filter === 'pending' 
                ? 'bg-yellow-100 text-yellow-700 font-medium' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Pending
          </button>
          <button 
            onClick={() => setFilter('taken')}
            className={`py-2 px-4 rounded-lg transition-all duration-300 ${
              filter === 'taken' 
                ? 'bg-green-100 text-green-700 font-medium' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Taken
          </button>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search medications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full md:w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all duration-300"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      
      {/* Medication Cards */}
      <div>
        {filteredMedications.length > 0 ? (
          filteredMedications.map(medication => (
            <ReminderCard key={medication.id} medication={medication} />
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <CheckCircle size={40} className="mx-auto mb-2 text-green-500" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No medications found</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'No medications match your search criteria.' 
                : filter === 'taken'
                ? 'No medications have been taken yet today.'
                : 'No pending medications.'}
            </p>
          </div>
        )}
      </div>
      
      {/* Add New Button */}
      <div className="fixed bottom-6 right-6">
        <button className="h-14 w-14 rounded-full bg-sky-500 hover:bg-sky-600 text-white shadow-lg flex items-center justify-center transition-all duration-300">
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};

export default Medication;