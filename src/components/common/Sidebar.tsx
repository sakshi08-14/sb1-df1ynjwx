import { Activity, Calendar, Home, Phone, Settings, Pill, ShieldAlert, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: <Home size={20} />, path: '/' },
    { name: 'Vitals', icon: <Activity size={20} />, path: '/vitals' },
    { name: 'Medication', icon: <Pill size={20} />, path: '/medication' },
    { name: 'Emergency', icon: <ShieldAlert size={20} />, path: '/emergency' },
    { name: 'Routine', icon: <Calendar size={20} />, path: '/routine' },
    { name: 'Video Call', icon: <Phone size={20} />, path: '/video-call' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } transition-transform duration-300 ease-in-out flex flex-col h-[calc(100vh-4rem)]`}
      >
        <div className="flex justify-between items-center p-4 md:hidden">
          <h2 className="font-bold text-xl text-sky-600">CareNest</h2>
          <button 
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-sky-100 text-sky-600'
                      : 'text-gray-600 hover:bg-sky-50 hover:text-sky-500'
                  }`}
                  onClick={() => isOpen && toggleSidebar()}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="bg-sky-50 rounded-xl p-4 text-center">
            <p className="text-sm font-medium text-gray-700 mb-2">Need help?</p>
            <button className="w-full py-2 px-4 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium transition-all duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;