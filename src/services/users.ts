import { doc, setDoc, getDoc, updateDoc, serverTimestamp, collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { UserProfile } from '../types';
import AchievementService from './achievements';

export interface AppNotification {
  id?: string;
  type: 'friend_request' | 'friend_accept' | 'post_like' | 'post_comment';
  message: string;
  relatedId?: string;
  read: boolean;
  timestamp: any;
}

export const addNotification = async (userId: string, notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
  const docRef = await addDoc(collection(db, 'notifications', userId, 'userNotifications'), {
    ...notification,
    read: false,
    timestamp: serverTimestamp(),
  });
  return docRef.id;
};

export const createUserProfile = async (userId: string, userData: Partial<UserProfile>) => {
  try {
    console.log('Creating user profile for:', userId);
    console.log('User data:', userData);
    
    const funnyLairNames = [
      'Lizard Lair',
      'BroTerrarium',
      'Gains Gang',
      'Swole Circle',
      'Reptile Roster',
      'BroTank',
      'The Herpetarium',
      'BroHabitat',
      'Lizard League',
      'Squad of Scales'
    ];
    const randomLairName = funnyLairNames[Math.floor(Math.random() * funnyLairNames.length)];

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
      achievements: [], // Use AchievementService if needed
      // Social features
      friends: [],
      followers: [],
      following: [],
      bio: '',
      profilePicture: '',
      isPublic: false,
      lairName: userData.lairName || randomLairName,
      // Advanced features
      preferences: {
        theme: 'dark',
        notifications: {
          workoutReminders: true,
          achievementAlerts: true,
          friendActivity: true,
          weeklyReports: true,
        },
        privacy: {
          showProfile: true,
          showWorkouts: true,
          showProgress: true,
        },
        workoutSettings: {
          defaultRestTime: 60,
          autoStartTimer: false,
          voiceCommands: false,
          showFormTips: true,
        },
      },
      goals: [],
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
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        achievements: data.achievements?.map((achievement: any) => ({
          ...achievement,
          unlockedAt: achievement.unlockedAt?.toDate(),
        })) || [],
      } as UserProfile;
    } else {
      console.log('No user profile found for:', userId);
      return null;
    }
  } catch (error: any) {
    console.error('Get user profile error:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  try {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, updates);
  } catch (error: any) {
    console.error('Update user profile error:', error);
    throw error;
  }
}; 