import { useState, useEffect } from 'react';
import DashboardCard from '../components/dashboard/DashboardCard';
import HealthSummary from '../components/dashboard/HealthSummary';
import MoodTracker from '../components/dashboard/MoodTracker';
import { CheckCircle, Clock, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { parentData } = useApp();
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const hours = new Date().getHours();
    let greetingText = '';
    
    if (hours < 12) {
      greetingText = 'Good morning';
    } else if (hours < 18) {
      greetingText = 'Good afternoon';
    } else {
      greetingText = 'Good evening';
    }
    
    setGreeting(greetingText);
  }, []);
  
  // Get upcoming medications (max 3)
  const upcomingMedications = parentData.medications
    .filter(med => !med.taken)
    .slice(0, 3);
  
  // Get upcoming routine tasks (max 3)
  const upcomingRoutine = parentData.routineItems
    .filter(item => !item.completed)
    .slice(0, 3);
  
  return (
    <div className="space-y-6">
      <div className="animate-fade">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{greeting}</h1>
        <p className="text-gray-600">
          Here's the latest update on {parentData.name}'s well-being.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Health Summary */}
        <DashboardCard title="Health Vitals" className="lg:col-span-2">
          <HealthSummary />
          <div className="mt-4 text-right">
            <Link 
              to="/vitals" 
              className="text-sm text-sky-600 hover:text-sky-800 transition-colors duration-300"
            >
              View detailed charts →
            </Link>
          </div>
        </DashboardCard>
        
        {/* Mood Tracker */}
        <DashboardCard title="Today's Mood">
          <MoodTracker />
        </DashboardCard>
        
        {/* Upcoming Medications */}
        <DashboardCard title="Upcoming Medications">
          <div className="space-y-3">
            {upcomingMedications.length > 0 ? (
              <>
                {upcomingMedications.map(med => (
                  <div key={med.id} className="flex items-center p-2 hover:bg-sky-50 rounded-lg transition-all duration-300">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{med.name}</p>
                      <p className="text-sm text-gray-500">{med.time} - {med.dosage}</p>
                    </div>
                  </div>
                ))}
                <div className="text-right">
                  <Link 
                    to="/medication" 
                    className="text-sm text-sky-600 hover:text-sky-800 transition-colors duration-300"
                  >
                    View all medications →
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <CheckCircle size={40} className="mx-auto mb-2 text-green-500" />
                <p className="text-gray-600">All medications taken for today!</p>
              </div>
            )}
          </div>
        </DashboardCard>
        
        {/* Daily Routine */}
        <DashboardCard title="Today's Routine">
          <div className="space-y-3">
            {upcomingRoutine.length > 0 ? (
              <>
                {upcomingRoutine.map(item => (
                  <div key={item.id} className="flex items-center p-2 hover:bg-sky-50 rounded-lg transition-all duration-300">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.time} - {item.category}</p>
                    </div>
                  </div>
                ))}
                <div className="text-right">
                  <Link 
                    to="/routine" 
                    className="text-sm text-sky-600 hover:text-sky-800 transition-colors duration-300"
                  >
                    View full routine →
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <CheckCircle size={40} className="mx-auto mb-2 text-green-500" />
                <p className="text-gray-600">All routine tasks completed!</p>
              </div>
            )}
          </div>
        </DashboardCard>
        
        {/* Quick Actions */}
        <DashboardCard title="Quick Actions" className="lg:col-span-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link 
              to="/video-call" 
              className="bg-sky-100 hover:bg-sky-200 p-4 rounded-xl text-center transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-full bg-sky-500 text-white flex items-center justify-center mx-auto mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <span className="font-medium text-sky-800">Call {parentData.name}</span>
            </Link>
            
            <Link 
              to="/emergency" 
              className="bg-red-50 hover:bg-red-100 p-4 rounded-xl text-center transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-full bg-red-500 text-white flex items-center justify-center mx-auto mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-alert"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>
              </div>
              <span className="font-medium text-red-800">Emergency</span>
            </Link>
            
            <Link 
              to="/medication" 
              className="bg-purple-50 hover:bg-purple-100 p-4 rounded-xl text-center transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-full bg-purple-500 text-white flex items-center justify-center mx-auto mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pill"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"></path><path d="m8.5 8.5 7 7"></path></svg>
              </div>
              <span className="font-medium text-purple-800">Medications</span>
            </Link>
            
            <Link 
              to="/routine" 
              className="bg-green-50 hover:bg-green-100 p-4 rounded-xl text-center transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
              </div>
              <span className="font-medium text-green-800">Routine</span>
            </Link>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Dashboard;