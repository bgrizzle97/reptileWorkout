import { User } from 'firebase/auth';

// Serializable versions of our data types
export interface SerializableUserProfile {
  id: string;
  email: string;
  displayName?: string;
  createdAt: string; // ISO string instead of Date
  totalWorkouts: number;
  currentStreak: number;
  daysSinceLastSkippedLegDay: number;
  totalWeightLifted: number;
  personalRecords: {
    benchPress: number;
    squat: number;
    deadlift: number;
  };
  achievements: SerializableAchievement[];
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
}

export interface WorkoutSet {
  exerciseId: string;
  exerciseName: string;
  weight: number;
  reps: number;
  completed: boolean;
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

// Conversion utilities
export const convertUserToSerializable = (user: User | null): SerializableUser | null => {
  if (!user) return null;
  
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
  };
};

export const convertUserProfileToSerializable = (profile: any): SerializableUserProfile | null => {
  if (!profile) return null;
  
  return {
    ...profile,
    createdAt: profile.createdAt instanceof Date ? profile.createdAt.toISOString() : profile.createdAt,
    achievements: profile.achievements?.map((achievement: any) => ({
      ...achievement,
      unlockedAt: achievement.unlockedAt instanceof Date ? achievement.unlockedAt.toISOString() : achievement.unlockedAt,
    })) || [],
  };
};

export const convertWorkoutToSerializable = (workout: any): SerializableWorkout | null => {
  if (!workout) return null;
  
  return {
    ...workout,
    date: workout.date instanceof Date ? workout.date.toISOString() : workout.date,
  };
};

export const convertWorkoutsToSerializable = (workouts: any[]): SerializableWorkout[] => {
  return workouts.map(workout => convertWorkoutToSerializable(workout)).filter(Boolean) as SerializableWorkout[];
}; 