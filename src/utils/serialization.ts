import { User } from 'firebase/auth';
import {
  UserProfile,
  Workout,
  Achievement,
  SerializableUserProfile,
  SerializableWorkout,
  SerializableAchievement,
  SerializableUser,
} from '../types';

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

export const convertUserProfileToSerializable = (profile: UserProfile): SerializableUserProfile => {
  return {
    ...profile,
    createdAt: profile.createdAt.toISOString(),
    lastWorkoutDate: profile.lastWorkoutDate?.toISOString(),
    achievements: profile.achievements.map(achievement => ({
      ...achievement,
      unlockedAt: achievement.unlockedAt?.toISOString(),
    })),
    goals: profile.goals.map(goal => ({
      ...goal,
      deadline: goal.deadline?.toISOString(),
      createdAt: goal.createdAt.toISOString(),
    })),
  };
};

export const convertSerializableUserProfileToUserProfile = (profile: SerializableUserProfile): UserProfile => {
  return {
    ...profile,
    createdAt: new Date(profile.createdAt),
    lastWorkoutDate: profile.lastWorkoutDate ? new Date(profile.lastWorkoutDate) : undefined,
    achievements: profile.achievements.map(achievement => ({
      ...achievement,
      unlockedAt: achievement.unlockedAt ? new Date(achievement.unlockedAt) : undefined,
    })),
    goals: profile.goals.map(goal => ({
      ...goal,
      deadline: goal.deadline ? new Date(goal.deadline) : undefined,
      createdAt: new Date(goal.createdAt),
    })),
  };
};

export const convertWorkoutToSerializable = (workout: Workout | null): SerializableWorkout | null => {
  if (!workout) return null;
  
  return {
    ...workout,
    date: workout.date instanceof Date ? workout.date.toISOString() : workout.date,
  };
};

export const convertWorkoutsToSerializable = (workouts: Workout[]): SerializableWorkout[] => {
  return workouts.map(workout => convertWorkoutToSerializable(workout)).filter(Boolean) as SerializableWorkout[];
};

export const convertSerializableToWorkout = (workout: SerializableWorkout): Workout => {
  return {
    ...workout,
    date: new Date(workout.date),
  };
}; 