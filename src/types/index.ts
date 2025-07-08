// Core data types
export interface UserProfile {
  id: string;
  email: string;
  displayName?: string;
  createdAt: Date;
  totalWorkouts: number;
  currentStreak: number;
  longestStreak: number;
  daysSinceLastSkippedLegDay: number;
  totalWeightLifted: number;
  supplementLogs: number;
  lastWorkoutDate?: Date;
  personalRecords: {
    benchPress: number;
    squat: number;
    deadlift: number;
    total: number;
  };
  specialStats: {
    [key: string]: number;
  };
  achievements: Achievement[];
  // Social features
  friends: string[];
  followers: string[];
  following: string[];
  bio?: string;
  profilePicture?: string;
  isPublic: boolean;
  lairName?: string; // Custom Lizard Lair name
  // Advanced features
  preferences: UserPreferences;
  goals: FitnessGoal[];
}

export interface UserPreferences {
  theme: 'dark' | 'light' | 'auto';
  notifications: {
    workoutReminders: boolean;
    achievementAlerts: boolean;
    friendActivity: boolean;
    weeklyReports: boolean;
  };
  privacy: {
    showProfile: boolean;
    showWorkouts: boolean;
    showProgress: boolean;
  };
  workoutSettings: {
    defaultRestTime: number;
    autoStartTimer: boolean;
    voiceCommands: boolean;
    showFormTips: boolean;
  };
}

export interface FitnessGoal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline?: Date;
  category: 'strength' | 'endurance' | 'weight' | 'body' | 'custom';
  isCompleted: boolean;
  createdAt: Date;
}

export interface WorkoutSet {
  exerciseId: string;
  exerciseName: string;
  weight: number;
  reps: number;
  completed: boolean;
}

export interface Workout {
  id: string;
  userId: string;
  name: string;
  date: Date;
  sets: WorkoutSet[];
  completed: boolean;
  duration?: number;
  totalWeight?: number;
  // Advanced features
  type: 'strength' | 'cardio' | 'flexibility' | 'mixed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  notes?: string;
  rating?: number;
  isPublic: boolean;
  tags: string[];
  // AI recommendations
  aiGenerated: boolean;
  recommendationScore?: number;
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroups: string[];
  equipment: string[];
  equipmentType: 'barbell' | 'dumbbell' | 'cable' | 'bodyweight' | 'machine' | 'other';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  instructions: string[];
  broScience: string;
  // Advanced features
  videoUrl?: string;
  imageUrl?: string;
  variations: string[];
  alternativeExercises: string[];
  formTips: string[];
  commonMistakes: string[];
  targetMuscles: string[];
  secondaryMuscles: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  unlockedAt?: Date;
}

export interface Supplement {
  id: string;
  name: string;
  category: 'Pre-Workout' | 'Post-Workout' | 'Protein' | 'Amino Acids' | 'Vitamins' | 'Other';
  description: string;
  benefits: string[];
  dosage: string;
  timing: string;
  broScience: string;
  price: number;
  rating: number;
  imageUrl?: string;
}

// Social features
export interface Friend {
  id: string;
  userId: string;
  friendId: string;
  status: 'pending' | 'accepted' | 'blocked';
  createdAt: Date;
}

export interface SocialActivity {
  id: string;
  userId: string;
  type: 'workout_completed' | 'achievement_unlocked' | 'personal_record' | 'goal_reached';
  title: string;
  description: string;
  data: any;
  createdAt: Date;
  isPublic: boolean;
  likes: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  createdAt: Date;
  likes: string[];
}

export interface Leaderboard {
  id: string;
  title: string;
  description: string;
  type: 'strength' | 'endurance' | 'consistency' | 'achievements';
  participants: LeaderboardEntry[];
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
}

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  profilePicture?: string;
  score: number;
  rank: number;
  lastUpdated: Date;
}

// AI and recommendations
export interface WorkoutRecommendation {
  id: string;
  userId: string;
  workout: Workout;
  reason: string;
  confidence: number;
  factors: string[];
  createdAt: Date;
}

export interface AIWorkoutPlan {
  id: string;
  userId: string;
  name: string;
  description: string;
  duration: number; // weeks
  workouts: PlannedWorkout[];
  goals: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  createdAt: Date;
  isActive: boolean;
}

export interface PlannedWorkout {
  id: string;
  name: string;
  exercises: PlannedExercise[];
  estimatedDuration: number;
  dayOfWeek: number;
  weekNumber: number;
}

export interface PlannedExercise {
  exerciseId: string;
  exerciseName: string;
  sets: number;
  reps: number;
  weight?: number;
  restTime: number;
  notes?: string;
}

// Analytics and progress
export interface ProgressMetrics {
  userId: string;
  date: Date;
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  measurements: {
    chest?: number;
    waist?: number;
    arms?: number;
    legs?: number;
  };
  photos?: string[];
  notes?: string;
}

export interface WorkoutAnalytics {
  userId: string;
  period: 'week' | 'month' | 'year';
  startDate: Date;
  endDate: Date;
  totalWorkouts: number;
  totalDuration: number;
  totalWeight: number;
  averageWorkoutDuration: number;
  mostFrequentExercises: string[];
  strengthProgress: {
    exercise: string;
    startWeight: number;
    endWeight: number;
    improvement: number;
  }[];
  consistencyScore: number;
}

// Serializable versions for Redux store
export interface SerializableUserProfile {
  id: string;
  email: string;
  displayName?: string;
  createdAt: string; // ISO string instead of Date
  totalWorkouts: number;
  currentStreak: number;
  longestStreak: number;
  daysSinceLastSkippedLegDay: number;
  totalWeightLifted: number;
  supplementLogs: number;
  lastWorkoutDate?: string;
  personalRecords: {
    benchPress: number;
    squat: number;
    deadlift: number;
    total: number;
  };
  specialStats: {
    [key: string]: number;
  };
  achievements: SerializableAchievement[];
  friends: string[];
  followers: string[];
  following: string[];
  bio?: string;
  profilePicture?: string;
  isPublic: boolean;
  lairName?: string; // Custom Lizard Lair name
  preferences: UserPreferences;
  goals: SerializableFitnessGoal[];
}

export interface SerializableFitnessGoal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline?: string;
  category: 'strength' | 'endurance' | 'weight' | 'body' | 'custom';
  isCompleted: boolean;
  createdAt: string;
}

export interface SerializableWorkout {
  id: string;
  userId: string;
  name: string;
  date: string; // ISO string instead of Date
  sets: WorkoutSet[];
  completed: boolean;
  duration?: number;
  totalWeight?: number;
  type: 'strength' | 'cardio' | 'flexibility' | 'mixed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  notes?: string;
  rating?: number;
  isPublic: boolean;
  tags: string[];
  aiGenerated: boolean;
  recommendationScore?: number;
}

export interface SerializableAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  unlockedAt?: string; // ISO string instead of Date
}

export interface SerializableUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

// Firebase configuration
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
} 