import { Bell, Menu, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const { parentData } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between transition-all duration-300">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-3 text-gray-600 hover:text-sky-500 transition-all duration-300 md:hidden"
        >
          <Menu size={24} />
        </button>
        <Link to="/" className="flex items-center">
          <span className="font-bold text-2xl text-sky-600">CareNest</span>
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button 
            onClick={toggleNotifications}
            className="text-gray-600 hover:text-sky-500 transition-all duration-300 relative"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              {parentData.medications.filter(med => !med.taken).length}
            </span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg py-2 z-10 animate-fade">
              <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="font-semibold text-gray-700">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {parentData.medications.filter(med => !med.taken).length > 0 ? (
                  parentData.medications.filter(med => !med.taken).map(med => (
                    <div key={med.id} className="px-4 py-2 hover:bg-sky-50 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-800">{med.name} is due</p>
                      <p className="text-xs text-gray-500">Scheduled for {med.time}</p>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-500">No new notifications</div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <button 
          onClick={toggleDarkMode} 
          className="text-gray-600 hover:text-sky-500 transition-all duration-300"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="hidden md:flex items-center">
          <div className="mr-2 text-right">
            <p className="text-sm font-medium text-gray-700">Caring for</p>
            <p className="text-xs text-gray-500">{parentData.name}, {parentData.age}</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-sky-200 flex items-center justify-center text-sky-700 font-medium">
            {parentData.name.charAt(0)}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;