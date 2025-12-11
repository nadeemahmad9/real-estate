import { 
  Dumbbell, Activity, Waves, Trophy, Gamepad2, 
  Baby, Smile, Sofa, Trees, Zap, ShieldCheck, Car
} from 'lucide-react';

export const MASTER_AMENITIES_LIST = {
  "Sports": [
    { name: "Gymnasium", icon: Dumbbell },
    { name: "Tennis Court(s)", icon: Activity },
    { name: "Jogging / Cycle Track", icon: Activity },
    { name: "Badminton Court(s)", icon: Trophy },
    { name: "Swimming Pool", icon: Waves },
    { name: "Basketball", icon: Activity },
    { name: "Snooker/Pool/Billiards", icon: Gamepad2 },
    { name: "Squash Court", icon: Trophy },
    { name: "Table Tennis", icon: Gamepad2 },
  ],
  "Leisure": [
    { name: "Yoga Areas", icon: Smile },
    { name: "Kids' Play Areas / Sand Pits", icon: Baby },
    { name: "Amphitheater", icon: Sofa },
    { name: "Party Lawn", icon: Trees },
  ],
  "Convenience": [
    { name: "Power Backup", icon: Zap },
    { name: "Lift", icon: Activity },
    { name: "Parking", icon: Car },
  ],
  "Safety": [
    { name: "24x7 Security", icon: ShieldCheck },
    { name: "CCTV", icon: ShieldCheck },
  ],
  "Environment": [
    { name: "Rain Water Harvesting", icon: Waves },
    { name: "Sewage Treatment", icon: Trees },
  ],
  "Furnishing": [
    { name: "Semi-Furnished", icon: Sofa },
    { name: "Fully Furnished", icon: Sofa },
  ]
};