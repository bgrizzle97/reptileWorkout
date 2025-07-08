import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { View } from 'react-native';
import AchievementNotification from '../components/AchievementNotification';
import AchievementService from '../services/achievements';
import { Achievement } from '../constants/achievements';
import { useAppSelector } from '../store';

interface AchievementContextType {
  showAchievementNotification: (achievement: Achievement) => void;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

interface AchievementProviderProps {
  children: ReactNode;
}

export const AchievementProvider: React.FC<AchievementProviderProps> = ({ children }) => {
  const [currentNotification, setCurrentNotification] = useState<Achievement | null>(null);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const userProfile = useAppSelector((state) => state.user.profile);

  useEffect(() => {
    // Set up achievement service callback
    AchievementService.onAchievementUnlocked = (achievement: Achievement) => {
      showAchievementNotification(achievement);
    };

    // Check for achievements when user profile changes
    if (userProfile) {
      checkForNewAchievements();
    }

    return () => {
      AchievementService.onAchievementUnlocked = undefined;
    };
  }, [userProfile]);

  const checkForNewAchievements = async () => {
    if (!userProfile) return;

    try {
      const newlyUnlocked = await AchievementService.checkAchievements(userProfile);
      if (newlyUnlocked.length > 0) {
        // The service will automatically trigger notifications
        console.log('New achievements unlocked:', newlyUnlocked.length);
      }
    } catch (error) {
      console.error('Error checking achievements:', error);
    }
  };

  const showAchievementNotification = (achievement: Achievement) => {
    setCurrentNotification(achievement);
    setIsNotificationVisible(true);
  };

  const hideNotification = () => {
    setIsNotificationVisible(false);
    setCurrentNotification(null);
  };

  const contextValue: AchievementContextType = {
    showAchievementNotification,
  };

  return (
    <AchievementContext.Provider value={contextValue}>
      {children}
      {currentNotification && (
        <AchievementNotification
          achievement={currentNotification}
          visible={isNotificationVisible}
          onClose={hideNotification}
        />
      )}
    </AchievementContext.Provider>
  );
};

export const useAchievement = (): AchievementContextType => {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error('useAchievement must be used within an AchievementProvider');
  }
  return context;
}; 