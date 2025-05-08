export const mockParentData = {
  name: "Elizabeth",
  age: 72,
  currentMood: "happy",
  lastContact: "2 hours ago",
  
  vitals: {
    heartRate: {
      current: 76,
      history: [75, 78, 74, 76, 73, 72, 76],
      normal: "60-100",
      unit: "bpm"
    },
    bloodPressure: {
      current: 132,
      history: [135, 130, 129, 132, 134, 131, 132],
      normal: "Below 130/80",
      unit: "mmHg"
    },
    glucose: {
      current: 105,
      history: [110, 103, 107, 105, 102, 106, 105],
      normal: "70-140",
      unit: "mg/dL"
    },
    sleep: {
      current: 7.2,
      history: [6.8, 7.5, 7.2, 8.0, 6.5, 7.0, 7.2],
      normal: "7-9",
      unit: "hours"
    }
  },
  
  medications: [
    {
      id: "med1",
      name: "Amlodipine",
      dosage: "10mg",
      time: "8:00 AM",
      taken: true,
      purpose: "Blood Pressure"
    },
    {
      id: "med2",
      name: "Metformin",
      dosage: "500mg",
      time: "9:00 AM",
      taken: false,
      purpose: "Diabetes"
    },
    {
      id: "med3",
      name: "Simvastatin",
      dosage: "20mg",
      time: "8:00 PM",
      taken: false,
      purpose: "Cholesterol"
    },
    {
      id: "med4",
      name: "Vitamin D",
      dosage: "1000 IU",
      time: "12:00 PM",
      taken: false,
      purpose: "Supplement"
    }
  ],
  
  alertHistory: [
    {
      id: "alert1",
      type: "Medication",
      message: "Missed morning medication",
      time: "Yesterday, 9:30 AM",
      resolved: true
    },
    {
      id: "alert2",
      type: "Fall Detection",
      message: "Possible fall detected",
      time: "3 days ago, 4:15 PM",
      resolved: true
    },
    {
      id: "alert3",
      type: "Vitals",
      message: "Blood pressure elevated",
      time: "Last week, 10:20 AM",
      resolved: true
    }
  ],
  
  routineItems: [
    {
      id: "routine1",
      name: "Breakfast",
      time: "8:30 AM",
      completed: true,
      category: "Meal"
    },
    {
      id: "routine2",
      name: "Morning Walk",
      time: "10:00 AM",
      completed: false,
      category: "Activity"
    },
    {
      id: "routine3",
      name: "Lunch",
      time: "12:30 PM",
      completed: false,
      category: "Meal"
    },
    {
      id: "routine4",
      name: "Doctor Appointment",
      time: "3:00 PM",
      completed: false,
      category: "Healthcare"
    },
    {
      id: "routine5",
      name: "Evening Call",
      time: "6:00 PM",
      completed: false,
      category: "Communication"
    }
  ],
  
  settings: {
    notifications: true,
    darkMode: false,
    timezone: "Eastern Time (ET)",
    language: "English",
    emergencyContacts: [
      {
        name: "John (Son)",
        phone: "555-123-4567"
      },
      {
        name: "Dr. Sarah Williams",
        phone: "555-987-6543"
      }
    ]
  }
};