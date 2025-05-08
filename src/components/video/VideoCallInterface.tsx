import { Mic, MicOff, Phone, Video, VideoOff } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../../context/AppContext';

const VideoCallInterface = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const { parentData } = useApp();

  const startCall = () => {
    setIsCallActive(true);
  };

  const endCall = () => {
    setIsCallActive(false);
    setIsMuted(false);
    setIsVideoOff(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
  };

  if (!isCallActive) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Connect with {parentData.name}</h3>
          <p className="text-gray-600 mb-6">
            Start a video call to check in and have a face-to-face conversation.
          </p>
          <button
            onClick={startCall}
            className="py-3 px-6 bg-sky-500 text-white rounded-lg font-medium transition-all duration-300 hover:bg-sky-600 flex items-center justify-center mx-auto"
          >
            <Video size={20} className="mr-2" />
            Start Video Call
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Last connected: {parentData.lastContact}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-xl shadow-md overflow-hidden h-[500px] relative">
      {/* Main video area */}
      <div className="h-full w-full bg-gray-800 flex items-center justify-center">
        {isVideoOff ? (
          <div className="text-center text-white">
            <VideoOff size={60} className="mx-auto mb-3 text-gray-400" />
            <p className="text-xl font-medium">Video paused</p>
          </div>
        ) : (
          <div className="w-full h-full relative">
            {/* This would be a real video feed */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-lg">Connecting with {parentData.name}...</p>
            </div>
            
            {/* Self view */}
            <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-700 rounded-lg overflow-hidden border-2 border-white">
              <div className="h-full w-full flex items-center justify-center">
                <p className="text-white text-xs">Your camera</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Call controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 px-4 py-3 flex justify-center space-x-4">
        <button
          onClick={toggleMute}
          className={`h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            isMuted ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          {isMuted ? (
            <MicOff size={20} className="text-white" />
          ) : (
            <Mic size={20} className="text-white" />
          )}
        </button>
        
        <button
          onClick={endCall}
          className="h-12 w-16 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-all duration-300"
        >
          <Phone size={20} className="text-white rotate-135" />
        </button>
        
        <button
          onClick={toggleVideo}
          className={`h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            isVideoOff ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          {isVideoOff ? (
            <VideoOff size={20} className="text-white" />
          ) : (
            <Video size={20} className="text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoCallInterface;