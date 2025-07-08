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
import { firebaseConfig } from '../config/firebase';

console.log('Initializing Firebase with config:', firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log('Firebase initialized successfully. Auth object:', auth);

// Data types
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

// Authentication functions
export const signUp = async (email: string, password: string) => {
  try {
    console.log('Attempting to sign up user:', email);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User created successfully:', userCredential.user.uid);
    return userCredential.user;
  } catch (error: any) {
    console.error('Sign up error:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw error;
  }
};

// User profile functions
export const createUserProfile = async (userId: string, userData: Partial<UserProfile>) => {
  try {
    console.log('Creating user profile for:', userId);
    console.log('User data:', userData);
    
    const defaultProfile: UserProfile = {
      id: userId,
      email: userData.email || '',
      displayName: userData.displayName,
      createdAt: new Date(),
      totalWorkouts: 0,
      currentStreak: 0,
      longestStreak: 0,
      daysSinceLastSkippedLegDay: 0,
      totalWeightLifted: 0,
      supplementLogs: 0,
      personalRecords: {
        benchPress: 0,
        squat: 0,
        deadlift: 0,
        total: 0,
      },
      specialStats: {},
      achievements: getDefaultAchievements(),
    };

    console.log('Default profile:', defaultProfile);

    await setDoc(doc(db, 'users', userId), {
      ...defaultProfile,
      ...userData,
      createdAt: serverTimestamp(),
    });
    
    console.log('User profile created successfully');
    return defaultProfile;
  } catch (error: any) {
    console.error('Create user profile error:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
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
        longestStreak: data.longestStreak || 0,
        supplementLogs: data.supplementLogs || 0,
        personalRecords: {
          ...data.personalRecords,
          total: data.personalRecords?.total || 0,
        },
        specialStats: data.specialStats || {},
      } as UserProfile;
    }
    return null;
  } catch (error: any) {
    throw error;
  }
};

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  try {
    await updateDoc(doc(db, 'users', userId), updates);
  } catch (error: any) {
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
  } catch (error: any) {
    throw error;
  }
};

export const updateWorkout = async (workoutId: string, updates: Partial<Workout>) => {
  try {
    await updateDoc(doc(db, 'workouts', workoutId), updates);
  } catch (error: any) {
    throw error;
  }
};

export const getUserWorkouts = async (userId: string): Promise<Workout[]> => {
  try {
    // First, check if user has any workouts
    const checkQuery = query(
      collection(db, 'workouts'),
      where('userId', '==', userId)
    );
    
    const checkSnapshot = await getDocs(checkQuery);
    
    // If no workouts exist, return empty array
    if (checkSnapshot.empty) {
      return [];
    }
    
    // If workouts exist, get them ordered by date
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
  } catch (error: any) {
    console.error('Error getting user workouts:', error);
    // If there's an index error, try without ordering
    if (error.code === 'failed-precondition' || error.code === 'unimplemented') {
      try {
        const simpleQuery = query(
          collection(db, 'workouts'),
          where('userId', '==', userId)
        );
        
        const simpleSnapshot = await getDocs(simpleQuery);
        return simpleSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date?.toDate() || new Date(),
        })) as Workout[];
      } catch (fallbackError: any) {
        console.error('Fallback query also failed:', fallbackError);
        return [];
      }
    }
    return [];
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
  } catch (error: any) {
    throw error;
  }
};

export const deleteWorkout = async (workoutId: string) => {
  try {
    await deleteDoc(doc(db, 'workouts', workoutId));
  } catch (error: any) {
    throw error;
  }
};

// Exercise functions
export const saveExercise = async (exercise: Omit<Exercise, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'exercises'), exercise);
    return docRef.id;
  } catch (error: any) {
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
  } catch (error: any) {
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
  } catch (error: any) {
    throw error;
  }
};

// Supplement functions
export const getSupplements = async (): Promise<Supplement[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'supplements'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Supplement[];
  } catch (error: any) {
    throw error;
  }
};

export const getSupplementsByCategory = async (category: string): Promise<Supplement[]> => {
  try {
    const q = query(
      collection(db, 'supplements'),
      where('category', '==', category)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Supplement[];
  } catch (error: any) {
    throw error;
  }
};

export const saveSupplement = async (supplement: Omit<Supplement, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'supplements'), supplement);
    return docRef.id;
  } catch (error: any) {
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

 