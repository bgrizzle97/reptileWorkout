import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { 
  setUser, 
  setLoading, 
  setError, 
  clearError 
} from '../store/slices/authSlice';
import { 
  setProfile, 
  updateProfile, 
  updateAchievements 
} from '../store/slices/userSlice';
import { 
  setWorkouts, 
  addWorkout, 
  updateWorkout, 
  deleteWorkout 
} from '../store/slices/workoutSlice';
import { 
  setExercises 
} from '../store/slices/exerciseSlice';
import { auth } from '../services/firebase';
import { createUserProfile, getUserProfile, updateUserProfile } from '../services/users';
import { saveWorkout, getUserWorkouts, updateWorkout as updateWorkoutFirebase, deleteWorkout as deleteWorkoutFirebase, updateUserStats } from '../services/workouts';
import { getExercises } from '../services/exercises';
import { checkAndUpdateAchievements } from '../services/achievements';
import { UserProfile, Workout, Exercise } from '../types';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  convertUserToSerializable, 
  convertUserProfileToSerializable, 
  convertWorkoutsToSerializable,
  convertWorkoutToSerializable 
} from '../utils/serialization';

export const useFirebase = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { profile } = useAppSelector((state: any) => state.user);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      dispatch(setUser(convertUserToSerializable(user)));
      
      if (user) {
        try {
          dispatch(setLoading(true));
          
          // Get or create user profile
          let userProfile = await getUserProfile(user.uid);
          if (!userProfile) {
            userProfile = await createUserProfile(user.uid, {
              email: user.email || '',
              displayName: user.displayName || undefined,
            });
          }
          
          dispatch(setProfile(convertUserProfileToSerializable(userProfile)));
          
          // Load user's workouts
          const workouts = await getUserWorkouts(user.uid);
          dispatch(setWorkouts(convertWorkoutsToSerializable(workouts)));
          
          // Load exercises
          const exercises = await getExercises();
          dispatch(setExercises(exercises));
          
        } catch (error: any) {
          dispatch(setError(error.message));
        } finally {
          dispatch(setLoading(false));
        }
      } else {
        // Clear user data when logged out
        dispatch(setProfile(null));
        dispatch(setWorkouts([]));
        dispatch(setExercises([]));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  // User profile operations
  const updateUserProfileData = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    
    try {
      dispatch(setLoading(true));
      await updateUserProfile(user.uid, updates);
      // Convert the updates to serializable format
      const serializableUpdates = {
        ...updates,
        createdAt: updates.createdAt?.toISOString(),
        lastWorkoutDate: updates.lastWorkoutDate?.toISOString(),
        achievements: updates.achievements?.map(achievement => ({
          ...achievement,
          unlockedAt: achievement.unlockedAt instanceof Date ? achievement.unlockedAt.toISOString() : achievement.unlockedAt,
        })),
      };
      dispatch(updateProfile(serializableUpdates));
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Workout operations
  const saveWorkoutData = async (workout: Omit<Workout, 'id' | 'userId'>) => {
    if (!user) return null;
    
    try {
      dispatch(setLoading(true));
      const workoutWithUser = {
        ...workout,
        userId: user.uid,
      };
      
      const workoutId = await saveWorkout(workoutWithUser);
      const savedWorkout = { ...workoutWithUser, id: workoutId };
      
      const serializedWorkout = convertWorkoutToSerializable(savedWorkout);
      if (serializedWorkout) {
        dispatch(addWorkout(serializedWorkout));
      }
      
      // Update user stats
      await updateUserStats(user.uid, savedWorkout);
      
      // Check and update achievements
      if (profile) {
        const updatedProfile = { ...profile, totalWorkouts: profile.totalWorkouts + 1 };
        const updatedAchievements = await checkAndUpdateAchievements(user.uid, updatedProfile);
        dispatch(updateProfile(updatedProfile));
        dispatch(updateAchievements(updatedAchievements.map(achievement => ({
          ...achievement,
          unlockedAt: achievement.unlockedAt instanceof Date ? achievement.unlockedAt.toISOString() : achievement.unlockedAt,
        }))));
      }
      
      return workoutId;
    } catch (error: any) {
      dispatch(setError(error.message));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateWorkoutData = async (workoutId: string, updates: Partial<Workout>) => {
    try {
      dispatch(setLoading(true));
      await updateWorkoutFirebase(workoutId, updates);
      const updatedWorkout = { id: workoutId, ...updates } as Workout;
      const serializedWorkout = convertWorkoutToSerializable(updatedWorkout);
      if (serializedWorkout) {
        dispatch(updateWorkout(serializedWorkout));
      }
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const deleteWorkoutData = async (workoutId: string) => {
    try {
      dispatch(setLoading(true));
      await deleteWorkoutFirebase(workoutId);
      dispatch(deleteWorkout(workoutId));
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Exercise operations
  const loadExercises = async () => {
    try {
      dispatch(setLoading(true));
      const exercises = await getExercises();
      dispatch(setExercises(exercises));
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Error handling
  const clearErrorData = () => {
    dispatch(clearError());
  };

  return {
    // Auth
    user,
    
    // Profile
    profile,
    updateUserProfileData,
    
    // Workouts
    saveWorkoutData,
    updateWorkoutData,
    deleteWorkoutData,
    
    // Exercises
    loadExercises,
    
    // Error handling
    clearErrorData,
  };
}; 