import { createContext, useContext, useState, ReactNode } from 'react';
import { mockParentData } from '../utils/mockData';

interface AppContextType {
  parentData: typeof mockParentData;
  updateMood: (mood: string) => void;
  updateVitals: (type: string, value: number) => void;
  confirmMedication: (id: string) => void;
  toggleRoutineItem: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [parentData, setParentData] = useState(mockParentData);

  const updateMood = (mood: string) => {
    setParentData(prev => ({
      ...prev,
      currentMood: mood
    }));
  };

  const updateVitals = (type: string, value: number) => {
    setParentData(prev => ({
      ...prev,
      vitals: {
        ...prev.vitals,
        [type]: {
          ...prev.vitals[type],
          current: value
        }
      }
    }));
  };

  const confirmMedication = (id: string) => {
    setParentData(prev => ({
      ...prev,
      medications: prev.medications.map(med => 
        med.id === id ? { ...med, taken: true } : med
      )
    }));
  };

  const toggleRoutineItem = (id: string) => {
    setParentData(prev => ({
      ...prev,
      routineItems: prev.routineItems.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    }));
  };

  const value = {
    parentData,
    updateMood,
    updateVitals,
    confirmMedication,
    toggleRoutineItem
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};