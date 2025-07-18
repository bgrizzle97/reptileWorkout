export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  requirement: number;
  type: 'workout' | 'streak' | 'pr' | 'supplement' | 'special';
  reward?: string;
  unlocked: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  // Basic Achievements
  {
    id: 'first_workout',
    title: 'Noob Gains',
    description: 'Complete your first workout',
    icon: '🎯',
    color: '#FFD700',
    requirement: 1,
    type: 'workout',
    reward: 'Unlock "Getting Swole" badge',
    unlocked: false,
  },
  {
    id: 'getting_swole',
    title: 'Getting Swole',
    description: 'Complete 5 workouts',
    icon: '💪',
    color: '#FF6B35',
    requirement: 5,
    type: 'workout',
    reward: 'Unlock "Gym Rat" badge',
    unlocked: false,
  },
  {
    id: 'gym_rat',
    title: 'Gym Rat',
    description: 'Complete 10 workouts',
    icon: '🏋️',
    color: '#4ECDC4',
    requirement: 10,
    type: 'workout',
    reward: 'Unlock "Gym Legend" badge',
    unlocked: false,
  },
  {
    id: 'gym_legend',
    title: 'Gym Legend',
    description: 'Complete 50 workouts',
    icon: '👑',
    color: '#9B59B6',
    requirement: 50,
    type: 'workout',
    reward: 'Exclusive "Legend" theme',
    unlocked: false,
  },
  {
    id: 'gym_master',
    title: 'Gym Master',
    description: 'Complete 100 workouts',
    icon: '🔥',
    color: '#E74C3C',
    requirement: 100,
    type: 'workout',
    reward: 'Custom mascot selection',
    unlocked: false,
  },

  // Streak Achievements
  {
    id: 'week_warrior',
    title: 'Week Warrior',
    description: 'Complete 7 workouts in a row',
    icon: '📅',
    color: '#3498DB',
    requirement: 7,
    type: 'streak',
    reward: 'Unlock "Month Master" badge',
    unlocked: false,
  },
  {
    id: 'month_master',
    title: 'Month Master',
    description: 'Complete 30 workouts in a row',
    icon: '📊',
    color: '#2ECC71',
    requirement: 30,
    type: 'streak',
    reward: 'Exclusive workout routines',
    unlocked: false,
  },
  {
    id: 'leg_day_warrior',
    title: 'Leg Day Warrior',
    description: 'Complete 30 consecutive leg days',
    icon: '🦵',
    color: '#F39C12',
    requirement: 30,
    type: 'streak',
    reward: 'Special leg day routine',
    unlocked: false,
  },

  // PR Achievements
  {
    id: 'pr_hunter',
    title: 'PR Hunter',
    description: 'Set 5 personal records',
    icon: '🎯',
    color: '#E67E22',
    requirement: 5,
    type: 'pr',
    reward: 'Advanced PR tracking',
    unlocked: false,
  },
  {
    id: 'pr_master',
    title: 'PR Master',
    description: 'Set 10 personal records',
    icon: '🏆',
    color: '#9B59B6',
    requirement: 10,
    type: 'pr',
    reward: 'Exclusive PR celebration',
    unlocked: false,
  },
  {
    id: 'bench_press_king',
    title: 'Bench Press King',
    description: 'Bench press 225 lbs',
    icon: '💪',
    color: '#E74C3C',
    requirement: 225,
    type: 'pr',
    reward: 'Bench press specialist routine',
    unlocked: false,
  },
  {
    id: 'squat_king',
    title: 'Squat King',
    description: 'Squat 315 lbs',
    icon: '🦵',
    color: '#2ECC71',
    requirement: 315,
    type: 'pr',
    reward: 'Squat specialist routine',
    unlocked: false,
  },
  {
    id: 'deadlift_king',
    title: 'Deadlift King',
    description: 'Deadlift 405 lbs',
    icon: '🏋️',
    color: '#F39C12',
    requirement: 405,
    type: 'pr',
    reward: 'Deadlift specialist routine',
    unlocked: false,
  },

  // Supplement Achievements
  {
    id: 'protein_master',
    title: 'Protein Master',
    description: 'Log 50 protein shakes',
    icon: '🥛',
    color: '#3498DB',
    requirement: 50,
    type: 'supplement',
    reward: 'Advanced nutrition tracking',
    unlocked: false,
  },
  {
    id: 'supplement_expert',
    title: 'Supplement Expert',
    description: 'Log 100 supplement entries',
    icon: '💊',
    color: '#9B59B6',
    requirement: 100,
    type: 'supplement',
    reward: 'Custom supplement guide',
    unlocked: false,
  },
  {
    id: 'pre_workout_warrior',
    title: 'Pre-Workout Warrior',
    description: 'Use pre-workout 30 times',
    icon: '⚡',
    color: '#E67E22',
    requirement: 30,
    type: 'supplement',
    reward: 'Exclusive pre-workout guide',
    unlocked: false,
  },

  // Special Achievements
  {
    id: 'early_bird',
    title: 'Early Bird',
    description: 'Complete 10 workouts before 8 AM',
    icon: '🌅',
    color: '#F1C40F',
    requirement: 10,
    type: 'special',
    reward: 'Morning workout routines',
    unlocked: false,
  },
  {
    id: 'night_owl',
    title: 'Night Owl',
    description: 'Complete 10 workouts after 10 PM',
    icon: '🌙',
    color: '#34495E',
    requirement: 10,
    type: 'special',
    reward: 'Late night workout routines',
    unlocked: false,
  },
  {
    id: 'weekend_warrior',
    title: 'Weekend Warrior',
    description: 'Complete 20 weekend workouts',
    icon: '🎉',
    color: '#E74C3C',
    requirement: 20,
    type: 'special',
    reward: 'Weekend warrior routines',
    unlocked: false,
  },
  {
    id: 'gym_buddy',
    title: 'Gym Buddy',
    description: 'Work out with a friend 10 times',
    icon: '👥',
    color: '#2ECC71',
    requirement: 10,
    type: 'special',
    reward: 'Partner workout routines',
    unlocked: false,
  },

  // Enhanced Achievement System - Phase 1
  {
    id: 'protein_master_100',
    title: 'Protein Master',
    description: 'Log 100 protein shakes',
    icon: '🥛',
    color: '#FF6B35',
    requirement: 100,
    type: 'supplement',
    reward: 'Exclusive protein shake recipes',
    unlocked: false,
  },
  {
    id: 'gym_legend_100',
    title: 'Gym Legend',
    description: 'Complete 100 total workouts',
    icon: '👑',
    color: '#9B59B6',
    requirement: 100,
    type: 'workout',
    reward: 'Legendary workout routines',
    unlocked: false,
  },
  {
    id: 'pr_hunter_10',
    title: 'PR Hunter',
    description: 'Set 10 personal records',
    icon: '🎯',
    color: '#E67E22',
    requirement: 10,
    type: 'pr',
    reward: 'Advanced PR tracking system',
    unlocked: false,
  },
  {
    id: 'leg_day_warrior_30',
    title: 'Leg Day Warrior',
    description: 'Complete 30 consecutive leg days',
    icon: '🦵',
    color: '#F39C12',
    requirement: 30,
    type: 'streak',
    reward: 'Specialized leg day routines',
    unlocked: false,
  },
  {
    id: 'cardio_king',
    title: 'Cardio King',
    description: 'Complete 50 cardio sessions',
    icon: '❤️',
    color: '#E74C3C',
    requirement: 50,
    type: 'workout',
    reward: 'Advanced cardio tracking',
    unlocked: false,
  },
  {
    id: 'strength_master',
    title: 'Strength Master',
    description: 'Achieve 1000+ total lbs in big 3 lifts',
    icon: '🏋️',
    color: '#2ECC71',
    requirement: 1000,
    type: 'pr',
    reward: 'Strength specialist programs',
    unlocked: false,
  },
  {
    id: 'consistency_champion',
    title: 'Consistency Champion',
    description: 'Work out 5+ days per week for 4 weeks',
    icon: '📈',
    color: '#3498DB',
    requirement: 20,
    type: 'streak',
    reward: 'Consistency tracking tools',
    unlocked: false,
  },
  {
    id: 'supplement_guru',
    title: 'Supplement Guru',
    description: 'Log 200 supplement entries',
    icon: '💊',
    color: '#9B59B6',
    requirement: 200,
    type: 'supplement',
    reward: 'Custom supplement stack builder',
    unlocked: false,
  },
  {
    id: 'morning_person',
    title: 'Morning Person',
    description: 'Complete 25 workouts before 7 AM',
    icon: '🌅',
    color: '#F1C40F',
    requirement: 25,
    type: 'special',
    reward: 'Early bird workout routines',
    unlocked: false,
  },
  {
    id: 'night_trainer',
    title: 'Night Trainer',
    description: 'Complete 25 workouts after 9 PM',
    icon: '🌙',
    color: '#34495E',
    requirement: 25,
    type: 'special',
    reward: 'Late night training programs',
    unlocked: false,
  },
  {
    id: 'weekend_warrior_50',
    title: 'Weekend Warrior',
    description: 'Complete 50 weekend workouts',
    icon: '🎉',
    color: '#E74C3C',
    requirement: 50,
    type: 'special',
    reward: 'Weekend warrior challenges',
    unlocked: false,
  },
  {
    id: 'social_fitness',
    title: 'Social Fitness',
    description: 'Share 20 workouts on social media',
    icon: '📱',
    color: '#2ECC71',
    requirement: 20,
    type: 'special',
    reward: 'Social media integration tools',
    unlocked: false,
  },
];

export const getAchievementProgress = (achievement: Achievement, userStats: any): number => {
  if (!userStats) return 0;
  
  switch (achievement.type) {
    case 'workout':
      if (achievement.id === 'cardio_king') {
        return Math.min(userStats.cardioSessions || 0, achievement.requirement);
      }
      return Math.min(userStats.totalWorkouts || 0, achievement.requirement);
    case 'streak':
      if (achievement.id === 'leg_day_warrior_30') {
        return Math.min(userStats.legDayStreak || 0, achievement.requirement);
      }
      if (achievement.id === 'consistency_champion') {
        return Math.min(userStats.weeklyWorkoutCount || 0, achievement.requirement);
      }
      return Math.min(userStats.currentStreak || 0, achievement.requirement);
    case 'pr':
      if (achievement.id === 'strength_master') {
        const bigThreeTotal = (userStats.personalRecords?.benchPress || 0) + 
                             (userStats.personalRecords?.squat || 0) + 
                             (userStats.personalRecords?.deadlift || 0);
        return Math.min(bigThreeTotal, achievement.requirement);
      }
      return Math.min(userStats.personalRecords?.total || 0, achievement.requirement);
    case 'supplement':
      if (achievement.id === 'protein_master_100') {
        return Math.min(userStats.proteinShakes || 0, achievement.requirement);
      }
      return Math.min(userStats.supplementLogs || 0, achievement.requirement);
    case 'special':
      if (achievement.id === 'morning_person') {
        return Math.min(userStats.morningWorkouts || 0, achievement.requirement);
      }
      if (achievement.id === 'night_trainer') {
        return Math.min(userStats.nightWorkouts || 0, achievement.requirement);
      }
      if (achievement.id === 'weekend_warrior_50') {
        return Math.min(userStats.weekendWorkouts || 0, achievement.requirement);
      }
      if (achievement.id === 'social_fitness') {
        return Math.min(userStats.sharedWorkouts || 0, achievement.requirement);
      }
      return Math.min(userStats.specialStats?.[achievement.id] || 0, achievement.requirement);
    default:
      return 0;
  }
};

export const checkAchievementUnlock = (achievement: Achievement, userStats: any): boolean => {
  const progress = getAchievementProgress(achievement, userStats);
  return progress >= achievement.requirement;
};

export const getUnlockedAchievements = (userStats: any): Achievement[] => {
  if (!userStats) return ACHIEVEMENTS.map(achievement => ({ ...achievement, unlocked: false }));
  
  return ACHIEVEMENTS.map(achievement => ({
    ...achievement,
    unlocked: checkAchievementUnlock(achievement, userStats),
  }));
};

export const getRecentUnlockedAchievements = (userStats: any): Achievement[] => {
  const unlockedAchievements = getUnlockedAchievements(userStats);
  return unlockedAchievements.filter(achievement => achievement.unlocked);
};

export const getNextAchievement = (userStats: any): Achievement | null => {
  if (!userStats) return ACHIEVEMENTS[0]; // Return first achievement if no user stats
  
  const unlockedAchievements = getUnlockedAchievements(userStats);
  const lockedAchievements = unlockedAchievements.filter(achievement => !achievement.unlocked);
  
  if (lockedAchievements.length === 0) return null;
  
  // Sort by requirement and return the easiest to achieve
  return lockedAchievements.sort((a, b) => a.requirement - b.requirement)[0];
}; 