import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  deleteDoc,
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Validate that all required environment variables are set
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error('Missing Firebase configuration. Please check your .env file.');
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Data types
export interface UserProfile {
  id: string;
  email: string;
  displayName?: string;
  createdAt: Date;
  totalWorkouts: number;
  currentStreak: number;
  daysSinceLastSkippedLegDay: number;
  totalWeightLifted: number;
  personalRecords: {
    benchPress: number;
    squat: number;
    deadlift: number;
  };
  achievements: Achievement[];
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
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroups: string[];
  equipment: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  instructions: string[];
  broScience: string;
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

// Authentication functions
export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// User profile functions
export const createUserProfile = async (userId: string, userData: Partial<UserProfile>) => {
  try {
    const defaultProfile: UserProfile = {
      id: userId,
      email: userData.email || '',
      displayName: userData.displayName,
      createdAt: new Date(),
      totalWorkouts: 0,
      currentStreak: 0,
      daysSinceLastSkippedLegDay: 0,
      totalWeightLifted: 0,
      personalRecords: {
        benchPress: 0,
        squat: 0,
        deadlift: 0,
      },
      achievements: getDefaultAchievements(),
    };

    await setDoc(doc(db, 'users', userId), {
      ...defaultProfile,
      ...userData,
      createdAt: serverTimestamp(),
    });
    
    return defaultProfile;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as UserProfile;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  try {
    await updateDoc(doc(db, 'users', userId), updates);
  } catch (error) {
    throw error;
  }
};

// Workout functions
export const saveWorkout = async (workout: Omit<Workout, 'id'>): Promise<string> => {
  try {
    const workoutData = {
      ...workout,
      date: serverTimestamp(),
      createdAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(collection(db, 'workouts'), workoutData);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const updateWorkout = async (workoutId: string, updates: Partial<Workout>) => {
  try {
    await updateDoc(doc(db, 'workouts', workoutId), updates);
  } catch (error) {
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
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate() || new Date(),
    })) as Workout[];
  } catch (error) {
    throw error;
  }
};

export const getWorkout = async (workoutId: string): Promise<Workout | null> => {
  try {
    const workoutDoc = await getDoc(doc(db, 'workouts', workoutId));
    if (workoutDoc.exists()) {
      const data = workoutDoc.data();
      return {
        id: workoutDoc.id,
        ...data,
        date: data.date?.toDate() || new Date(),
      } as Workout;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const deleteWorkout = async (workoutId: string) => {
  try {
    await deleteDoc(doc(db, 'workouts', workoutId));
  } catch (error) {
    throw error;
  }
};

// Exercise functions
export const saveExercise = async (exercise: Omit<Exercise, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'exercises'), exercise);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getExercises = async (): Promise<Exercise[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'exercises'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Exercise[];
  } catch (error) {
    throw error;
  }
};

export const getExercisesByCategory = async (category: string): Promise<Exercise[]> => {
  try {
    const q = query(
      collection(db, 'exercises'),
      where('category', '==', category)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Exercise[];
  } catch (error) {
    throw error;
  }
};

// Stats and analytics functions
export const updateUserStats = async (userId: string, workout: Workout) => {
  try {
    const userProfile = await getUserProfile(userId);
    if (!userProfile) return;

    const totalWeight = workout.sets.reduce((sum, set) => sum + (set.weight * set.reps), 0);
    const completedSets = workout.sets.filter(set => set.completed).length;

    const updates: Partial<UserProfile> = {
      totalWorkouts: userProfile.totalWorkouts + 1,
      totalWeightLifted: userProfile.totalWeightLifted + totalWeight,
    };

    // Update personal records
    const newPRs = { ...userProfile.personalRecords };
    workout.sets.forEach(set => {
      if (set.completed) {
        switch (set.exerciseName.toLowerCase()) {
          case 'bench press':
            if (set.weight > newPRs.benchPress) newPRs.benchPress = set.weight;
            break;
          case 'squat':
            if (set.weight > newPRs.squat) newPRs.squat = set.weight;
            break;
          case 'deadlift':
            if (set.weight > newPRs.deadlift) newPRs.deadlift = set.weight;
            break;
        }
      }
    });

    updates.personalRecords = newPRs;

    await updateUserProfile(userId, updates);
  } catch (error) {
    throw error;
  }
};

// Achievement functions
export const getDefaultAchievements = (): Achievement[] => [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first workout',
    icon: '🏋️',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: '2',
    title: 'Consistency King',
    description: 'Complete 7 workouts in a row',
    icon: '🔥',
    unlocked: false,
    progress: 0,
    maxProgress: 7,
  },
  {
    id: '3',
    title: 'Leg Day Warrior',
    description: 'Don\'t skip leg day for 30 days',
    icon: '🦵',
    unlocked: false,
    progress: 0,
    maxProgress: 30,
  },
  {
    id: '4',
    title: 'Bench Press Beast',
    description: 'Bench press 225 lbs',
    icon: '💪',
    unlocked: false,
    progress: 0,
    maxProgress: 225,
  },
  {
    id: '5',
    title: 'Squat Master',
    description: 'Squat 315 lbs',
    icon: '🏋️‍♂️',
    unlocked: false,
    progress: 0,
    maxProgress: 315,
  },
];

export const checkAndUpdateAchievements = async (userId: string, userProfile: UserProfile) => {
  try {
    const updatedAchievements = [...userProfile.achievements];
    let hasUpdates = false;

    // Check First Steps achievement
    const firstSteps = updatedAchievements.find(a => a.id === '1');
    if (firstSteps && !firstSteps.unlocked && userProfile.totalWorkouts >= 1) {
      firstSteps.unlocked = true;
      firstSteps.progress = 1;
      firstSteps.unlockedAt = new Date();
      hasUpdates = true;
    }

    // Check Consistency King achievement
    const consistencyKing = updatedAchievements.find(a => a.id === '2');
    if (consistencyKing && !consistencyKing.unlocked) {
      consistencyKing.progress = Math.min(userProfile.currentStreak, 7);
      if (consistencyKing.progress >= 7) {
        consistencyKing.unlocked = true;
        consistencyKing.unlockedAt = new Date();
        hasUpdates = true;
      }
    }

    // Check Bench Press Beast achievement
    const benchBeast = updatedAchievements.find(a => a.id === '4');
    if (benchBeast && !benchBeast.unlocked) {
      benchBeast.progress = Math.max(userProfile.personalRecords.benchPress, 0);
      if (benchBeast.progress >= 225) {
        benchBeast.unlocked = true;
        benchBeast.unlockedAt = new Date();
        hasUpdates = true;
      }
    }

    // Check Squat Master achievement
    const squatMaster = updatedAchievements.find(a => a.id === '5');
    if (squatMaster && !squatMaster.unlocked) {
      squatMaster.progress = Math.max(userProfile.personalRecords.squat, 0);
      if (squatMaster.progress >= 315) {
        squatMaster.unlocked = true;
        squatMaster.unlockedAt = new Date();
        hasUpdates = true;
      }
    }

    if (hasUpdates) {
      await updateUserProfile(userId, { achievements: updatedAchievements });
    }

    return updatedAchievements;
  } catch (error) {
    throw error;
  }
}; 