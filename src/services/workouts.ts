import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  deleteDoc,
  getDoc,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { Workout, UserProfile } from '../types';
import { updateUserProfile } from './users';
import { checkAndUpdateAchievements } from './achievements';

export const saveWorkout = async (workout: Omit<Workout, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'workouts'), {
      ...workout,
      date: Timestamp.fromDate(workout.date),
    });
    return docRef.id;
  } catch (error: any) {
    console.error('Save workout error:', error);
    throw error;
  }
};

export const updateWorkout = async (workoutId: string, updates: Partial<Workout>) => {
  try {
    const docRef = doc(db, 'workouts', workoutId);
    const updateData: any = { ...updates };
    if (updates.date) {
      // Convert Date to Timestamp for Firestore
      updateData.date = updates.date instanceof Date ? Timestamp.fromDate(updates.date) : updates.date;
    }
    await updateDoc(docRef, updateData);
  } catch (error: any) {
    console.error('Update workout error:', error);
    throw error;
  }
};

export const getUserWorkouts = async (userId: string): Promise<Workout[]> => {
  try {
    const q = query(
      collection(db, 'workouts'),
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const workouts: Workout[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      workouts.push({
        id: doc.id,
        ...data,
        date: data.date?.toDate() || new Date(),
      } as Workout);
    });
    
    return workouts;
  } catch (error: any) {
    console.error('Get user workouts error:', error);
    throw error;
  }
};

export const getWorkout = async (workoutId: string): Promise<Workout | null> => {
  try {
    const docRef = doc(db, 'workouts', workoutId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        date: data.date?.toDate() || new Date(),
      } as Workout;
    } else {
      return null;
    }
  } catch (error: any) {
    console.error('Get workout error:', error);
    throw error;
  }
};

export const deleteWorkout = async (workoutId: string) => {
  try {
    await deleteDoc(doc(db, 'workouts', workoutId));
  } catch (error: any) {
    console.error('Delete workout error:', error);
    throw error;
  }
};

export const updateUserStats = async (userId: string, workout: Workout) => {
  try {
    // Get current user profile
    const userProfile = await getUserProfile(userId);
    if (!userProfile) return;

    // Calculate workout stats
    const totalWeight = workout.sets.reduce((sum, set) => sum + (set.weight * set.reps), 0);
    const hasLegExercises = workout.sets.some(set => 
      set.exerciseName.toLowerCase().includes('squat') ||
      set.exerciseName.toLowerCase().includes('deadlift') ||
      set.exerciseName.toLowerCase().includes('leg press') ||
      set.exerciseName.toLowerCase().includes('lunge')
    );

    // Update user stats
    const updates: Partial<UserProfile> = {
      totalWorkouts: userProfile.totalWorkouts + 1,
      totalWeightLifted: userProfile.totalWeightLifted + totalWeight,
    };

    // Update streak
    const today = new Date();
    const lastWorkoutDate = userProfile.lastWorkoutDate ? new Date(userProfile.lastWorkoutDate) : null;
    const daysSinceLastWorkout = lastWorkoutDate ? 
      Math.floor((today.getTime() - lastWorkoutDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;

    if (daysSinceLastWorkout <= 1) {
      updates.currentStreak = userProfile.currentStreak + 1;
      updates.longestStreak = Math.max(userProfile.longestStreak, userProfile.currentStreak + 1);
    } else {
      updates.currentStreak = 1;
    }

    updates.lastWorkoutDate = today;

    // Update leg day counter
    if (hasLegExercises) {
      updates.daysSinceLastSkippedLegDay = 0;
    } else {
      updates.daysSinceLastSkippedLegDay = (userProfile.daysSinceLastSkippedLegDay || 0) + 1;
    }

    // Update personal records
    const benchPress = workout.sets.find(set => 
      set.exerciseName.toLowerCase().includes('bench press')
    );
    const squat = workout.sets.find(set => 
      set.exerciseName.toLowerCase().includes('squat')
    );
    const deadlift = workout.sets.find(set => 
      set.exerciseName.toLowerCase().includes('deadlift')
    );

    if (benchPress && benchPress.weight > userProfile.personalRecords.benchPress) {
      updates.personalRecords = {
        ...userProfile.personalRecords,
        benchPress: benchPress.weight,
        total: userProfile.personalRecords.squat + benchPress.weight + userProfile.personalRecords.deadlift,
      };
    }

    if (squat && squat.weight > userProfile.personalRecords.squat) {
      updates.personalRecords = {
        ...userProfile.personalRecords,
        squat: squat.weight,
        total: userProfile.personalRecords.benchPress + squat.weight + userProfile.personalRecords.deadlift,
      };
    }

    if (deadlift && deadlift.weight > userProfile.personalRecords.deadlift) {
      updates.personalRecords = {
        ...userProfile.personalRecords,
        deadlift: deadlift.weight,
        total: userProfile.personalRecords.benchPress + userProfile.personalRecords.squat + deadlift.weight,
      };
    }

    // Update user profile
    await updateUserProfile(userId, updates);

    // Note: Achievements are now only checked when a workout is actually saved
    // This prevents achievement checking on daily check-ins

  } catch (error: any) {
    console.error('Update user stats error:', error);
    throw error;
  }
};

// Helper function to get user profile (imported from users service)
const getUserProfile = async (userId: string) => {
  const { getUserProfile } = await import('./users');
  return getUserProfile(userId);
}; 