import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../constants/theme';
import { ACHIEVEMENTS, getUnlockedAchievements, getNextAchievement, getAchievementProgress } from '../constants/achievements';
import { auth, getUserProfile, UserProfile } from '../services/firebase';

interface AchievementsScreenProps {
  navigation: any;
}

const AchievementsScreen = ({ navigation }: AchievementsScreenProps) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState(ACHIEVEMENTS);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      if (auth.currentUser) {
        const profile = await getUserProfile(auth.currentUser.uid);
        setUserProfile(profile);
        
        // Update achievements with user stats
        const unlockedAchievements = getUnlockedAchievements(profile);
        setAchievements(unlockedAchievements);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProgressPercentage = (achievement: any) => {
    if (!userProfile) return 0;
    const progress = getAchievementProgress(achievement, userProfile);
    return Math.min((progress / achievement.requirement) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return theme.colors.primary;
    if (percentage >= 75) return '#2ECC71';
    if (percentage >= 50) return '#F39C12';
    if (percentage >= 25) return '#E67E22';
    return '#E74C3C';
  };

  const handleAchievementPress = (achievement: any) => {
    const percentage = getProgressPercentage(achievement);
    const progress = getAchievementProgress(achievement, userProfile);
    
    Alert.alert(
      achievement.title,
      `${achievement.description}\n\nProgress: ${progress}/${achievement.requirement} (${percentage.toFixed(1)}%)\n\n${achievement.reward ? `Reward: ${achievement.reward}` : 'No reward yet'}`,
      [{ text: 'OK' }]
    );
  };

  const renderAchievementCard = (achievement: any) => {
    const percentage = getProgressPercentage(achievement);
    const progress = getAchievementProgress(achievement, userProfile);
    const progressColor = getProgressColor(percentage);

    return (
      <TouchableOpacity
        key={achievement.id}
        onPress={() => handleAchievementPress(achievement)}
        style={styles.achievementCard}
      >
        <LinearGradient
          colors={achievement.unlocked ? [achievement.color, theme.colors.primary] : theme.gradients.card}
          style={[styles.achievementGradient, achievement.unlocked && styles.unlockedAchievement]}
        >
          <View style={styles.achievementHeader}>
            <Text style={styles.achievementIcon}>{achievement.icon}</Text>
            <View style={styles.achievementInfo}>
              <Text style={[styles.achievementTitle, achievement.unlocked && styles.unlockedText]}>
                {achievement.title}
              </Text>
              <Text style={[styles.achievementDescription, achievement.unlocked && styles.unlockedText]}>
                {achievement.description}
              </Text>
            </View>
            {achievement.unlocked && (
              <Text style={styles.unlockedBadge}>✓</Text>
            )}
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${percentage}%`,
                    backgroundColor: progressColor
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {progress}/{achievement.requirement} ({percentage.toFixed(1)}%)
            </Text>
          </View>

          {achievement.reward && (
            <View style={styles.rewardContainer}>
              <Text style={styles.rewardLabel}>Reward:</Text>
              <Text style={styles.rewardText}>{achievement.reward}</Text>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const getAchievementStats = () => {
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalCount = achievements.length;
    const percentage = ((unlockedCount / totalCount) * 100).toFixed(1);
    
    return { unlockedCount, totalCount, percentage };
  };

  const stats = getAchievementStats();
  const nextAchievement = getNextAchievement(userProfile);

  if (loading) {
    return (
      <LinearGradient colors={theme.gradients.background} style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading your achievements...</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={theme.gradients.background}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Achievement Hall</Text>
          <Text style={styles.subtitle}>Track your progress and unlock rewards!</Text>
        </View>

        {/* Achievement Stats */}
        <LinearGradient
          colors={theme.gradients.card}
          style={styles.statsCard}
        >
          <Text style={styles.statsTitle}>Your Progress</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.unlockedCount}</Text>
              <Text style={styles.statLabel}>Unlocked</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.totalCount}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.percentage}%</Text>
              <Text style={styles.statLabel}>Complete</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Next Achievement */}
        {nextAchievement && (
          <LinearGradient
            colors={theme.gradients.cyanGlow}
            style={styles.nextAchievementCard}
          >
            <Text style={styles.nextAchievementTitle}>Next Achievement</Text>
            <View style={styles.nextAchievementContent}>
              <Text style={styles.nextAchievementIcon}>{nextAchievement.icon}</Text>
              <View style={styles.nextAchievementInfo}>
                <Text style={styles.nextAchievementName}>{nextAchievement.title}</Text>
                <Text style={styles.nextAchievementDescription}>{nextAchievement.description}</Text>
                <Text style={styles.nextAchievementProgress}>
                  {getAchievementProgress(nextAchievement, userProfile)}/{nextAchievement.requirement}
                </Text>
              </View>
            </View>
          </LinearGradient>
        )}

        {/* Achievement Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>All Achievements</Text>
          
          {/* Basic Achievements */}
          <View style={styles.categorySection}>
            <Text style={styles.categoryTitle}>🏆 Basic Achievements</Text>
            {achievements.filter(a => a.type === 'workout').map(renderAchievementCard)}
          </View>

          {/* Streak Achievements */}
          <View style={styles.categorySection}>
            <Text style={styles.categoryTitle}>📅 Streak Achievements</Text>
            {achievements.filter(a => a.type === 'streak').map(renderAchievementCard)}
          </View>

          {/* PR Achievements */}
          <View style={styles.categorySection}>
            <Text style={styles.categoryTitle}>🎯 PR Achievements</Text>
            {achievements.filter(a => a.type === 'pr').map(renderAchievementCard)}
          </View>

          {/* Supplement Achievements */}
          <View style={styles.categorySection}>
            <Text style={styles.categoryTitle}>💊 Supplement Achievements</Text>
            {achievements.filter(a => a.type === 'supplement').map(renderAchievementCard)}
          </View>

          {/* Special Achievements */}
          <View style={styles.categorySection}>
            <Text style={styles.categoryTitle}>⭐ Special Achievements</Text>
            {achievements.filter(a => a.type === 'special').map(renderAchievementCard)}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  backButton: {
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  backButtonText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  title: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
    ...theme.effects.textGlow,
  },
  subtitle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.secondary,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.primary,
  },
  statsCard: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.glow,
  },
  statsTitle: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    ...theme.effects.textGlow,
  },
  statLabel: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  nextAchievementCard: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.neon,
  },
  nextAchievementTitle: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.background,
    marginBottom: theme.spacing.md,
  },
  nextAchievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextAchievementIcon: {
    fontSize: 40,
    marginRight: theme.spacing.md,
  },
  nextAchievementInfo: {
    flex: 1,
  },
  nextAchievementName: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.background,
    marginBottom: theme.spacing.xs,
  },
  nextAchievementDescription: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.background,
    marginBottom: theme.spacing.xs,
  },
  nextAchievementProgress: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.background,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.lg,
    ...theme.effects.textGlow,
  },
  categorySection: {
    marginBottom: theme.spacing.xl,
  },
  categoryTitle: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  achievementCard: {
    marginBottom: theme.spacing.md,
  },
  achievementGradient: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.glow,
  },
  unlockedAchievement: {
    ...theme.shadows.neon,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  achievementIcon: {
    fontSize: 30,
    marginRight: theme.spacing.md,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  achievementDescription: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
  },
  unlockedText: {
    color: theme.colors.background,
  },
  unlockedBadge: {
    fontSize: 24,
    color: theme.colors.background,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginTop: theme.spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.background,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: theme.spacing.xs,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  rewardContainer: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: theme.borderRadius.sm,
  },
  rewardLabel: {
    fontSize: theme.fontSizes.small,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  rewardText: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
  },
});

export default AchievementsScreen; 