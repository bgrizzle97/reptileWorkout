import { ACHIEVEMENTS, Achievement, getAchievementProgress, checkAchievementUnlock } from '../constants/achievements';
import { auth, updateUserProfile } from './firebase';

export interface AchievementNotification {
  achievement: Achievement;
  timestamp: number;
}

class AchievementService {
  private static instance: AchievementService;
  private notificationQueue: AchievementNotification[] = [];
  private isProcessing = false;

  static getInstance(): AchievementService {
    if (!AchievementService.instance) {
      AchievementService.instance = new AchievementService();
    }
    return AchievementService.instance;
  }

  /**
   * Check for newly unlocked achievements and add them to notification queue
   */
  async checkAchievements(userStats: any): Promise<Achievement[]> {
    if (!auth.currentUser || !userStats) return [];

    const newlyUnlocked: Achievement[] = [];
    
    for (const achievement of ACHIEVEMENTS) {
      const wasUnlocked = userStats.unlockedAchievements?.includes(achievement.id) || false;
      const isUnlocked = checkAchievementUnlock(achievement, userStats);
      
      if (isUnlocked && !wasUnlocked) {
        newlyUnlocked.push(achievement);
        this.addToNotificationQueue(achievement);
      }
    }

    // Update user profile with newly unlocked achievements
    if (newlyUnlocked.length > 0) {
      await this.updateUserAchievements(newlyUnlocked);
    }

    return newlyUnlocked;
  }

  /**
   * Add achievement to notification queue
   */
  private addToNotificationQueue(achievement: Achievement): void {
    const notification: AchievementNotification = {
      achievement,
      timestamp: Date.now(),
    };
    
    this.notificationQueue.push(notification);
    
    // Process queue if not already processing
    if (!this.isProcessing) {
      this.processNotificationQueue();
    }
  }

  /**
   * Process notification queue with delays between notifications
   */
  private async processNotificationQueue(): Promise<void> {
    if (this.isProcessing || this.notificationQueue.length === 0) return;

    this.isProcessing = true;

    while (this.notificationQueue.length > 0) {
      const notification = this.notificationQueue.shift();
      if (notification) {
        // Emit notification event (will be handled by the app)
        this.emitAchievementNotification(notification.achievement);
        
        // Wait 2 seconds before showing next notification
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    this.isProcessing = false;
  }

  /**
   * Emit achievement notification event
   */
  private emitAchievementNotification(achievement: Achievement): void {
    // This will be handled by the app's event system
    // For now, we'll use a simple callback system
    if (this.onAchievementUnlocked) {
      this.onAchievementUnlocked(achievement);
    }
  }

  /**
   * Update user profile with newly unlocked achievements
   */
  private async updateUserAchievements(newAchievements: Achievement[]): Promise<void> {
    if (!auth.currentUser) return;

    try {
      // Update user profile with new achievements
      await updateUserProfile(auth.currentUser.uid, {
        achievements: newAchievements,
      });
    } catch (error) {
      console.error('Error updating user achievements:', error);
    }
  }

  /**
   * Get achievement progress for a specific achievement
   */
  getProgress(achievement: Achievement, userStats: any): number {
    return getAchievementProgress(achievement, userStats);
  }

  /**
   * Get all achievements with their unlock status
   */
  getAllAchievements(userStats: any): Achievement[] {
    return ACHIEVEMENTS.map(achievement => ({
      ...achievement,
      unlocked: checkAchievementUnlock(achievement, userStats),
    }));
  }

  /**
   * Get achievements by category
   */
  getAchievementsByCategory(userStats: any): Record<string, Achievement[]> {
    const achievements = this.getAllAchievements(userStats);
    const categories: Record<string, Achievement[]> = {
      workout: [],
      streak: [],
      pr: [],
      supplement: [],
      special: [],
    };

    achievements.forEach(achievement => {
      if (categories[achievement.type]) {
        categories[achievement.type].push(achievement);
      }
    });

    return categories;
  }

  /**
   * Get achievement statistics
   */
  getAchievementStats(userStats: any): {
    total: number;
    unlocked: number;
    percentage: number;
    nextAchievement: Achievement | null;
  } {
    const achievements = this.getAllAchievements(userStats);
    const unlocked = achievements.filter(a => a.unlocked);
    
    // Find next achievement to unlock
    const locked = achievements.filter(a => !a.unlocked);
    const nextAchievement = locked.length > 0 
      ? locked.sort((a, b) => a.requirement - b.requirement)[0] 
      : null;

    return {
      total: achievements.length,
      unlocked: unlocked.length,
      percentage: Math.round((unlocked.length / achievements.length) * 100),
      nextAchievement,
    };
  }

  // Callback for achievement notifications
  onAchievementUnlocked?: (achievement: Achievement) => void;
}

export default AchievementService.getInstance(); 