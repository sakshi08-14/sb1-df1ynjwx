import { useApp } from '../../context/AppContext';

const MoodTracker = () => {
  const { parentData, updateMood } = useApp();
  
  const moods = [
    { emoji: '😊', name: 'happy' },
    { emoji: '😐', name: 'neutral' },
    { emoji: '😔', name: 'sad' },
    { emoji: '😴', name: 'tired' },
    { emoji: '🤒', name: 'sick' }
  ];

  return (
    <div>
      <p className="text-gray-600 mb-3">Current mood: <span className="font-medium">{parentData.currentMood}</span></p>
      <div className="flex justify-between">
        {moods.map((mood) => (
          <button
            key={mood.name}
            onClick={() => updateMood(mood.name)}
            className={`text-2xl p-2 rounded-full transition-all duration-300 ${
              parentData.currentMood === mood.name
                ? 'bg-sky-100 transform scale-110'
                : 'hover:bg-gray-100'
            }`}
            aria-label={`Set mood to ${mood.name}`}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodTracker;