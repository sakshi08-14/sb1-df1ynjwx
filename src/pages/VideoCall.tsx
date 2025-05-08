import VideoCallInterface from '../components/video/VideoCallInterface';
import { Clock, PhoneCall } from 'lucide-react';
import { useApp } from '../context/AppContext';

const VideoCall = () => {
  const { parentData } = useApp();
  
  const recentCalls = [
    { id: 1, date: 'Yesterday', time: '10:15 AM', duration: '15 min' },
    { id: 2, date: '3 days ago', time: '2:30 PM', duration: '8 min' },
    { id: 3, date: 'Last week', time: '6:45 PM', duration: '22 min' }
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Video Call</h1>
        <p className="text-gray-600">
          Connect with {parentData.name} through a face-to-face video call.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Call Area */}
        <div className="lg:col-span-2">
          <VideoCallInterface />
        </div>
        
        {/* Call History */}
        <div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Calls</h3>
            
            <div className="space-y-4">
              {recentCalls.map(call => (
                <div key={call.id} className="p-3 border border-gray-200 rounded-lg flex items-center justify-between hover:border-sky-200 transition-all duration-300">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-500 mr-3">
                      <PhoneCall size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{call.date}</p>
                      <p className="text-sm text-gray-500">{call.time} • {call.duration}</p>
                    </div>
                  </div>
                  <button className="text-sky-600 hover:text-sky-800 transition-colors duration-300">
                    <Clock size={18} />
                  </button>
                </div>
              ))}
              
              <button className="w-full text-center py-2 text-sm text-sky-600 hover:text-sky-800 transition-colors duration-300">
                View all call history
              </button>
            </div>
          </div>
          
          {/* Scheduled Calls */}
          <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Scheduled Calls</h3>
            
            <div className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-gray-800">Daily Check-in</p>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
              </div>
              <p className="text-sm text-gray-500 mb-2">Every day at 9:00 AM</p>
              <div className="flex justify-end">
                <button className="text-sm text-sky-600 hover:text-sky-800 transition-colors duration-300">
                  Edit
                </button>
              </div>
            </div>
            
            <button className="w-full py-2 px-4 bg-sky-100 hover:bg-sky-200 text-sky-700 rounded-lg transition-colors duration-300">
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
      
      {/* Tips Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Video Call Tips</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Ensure Good Lighting</h4>
            <p className="text-sm text-gray-600">
              Make sure you're in a well-lit area so {parentData.name} can see you clearly.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Speak Clearly</h4>
            <p className="text-sm text-gray-600">
              Speak slowly and clearly, especially if there are hearing difficulties.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Stable Connection</h4>
            <p className="text-sm text-gray-600">
              Use a stable internet connection to avoid call disruptions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;