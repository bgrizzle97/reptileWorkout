import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../constants/theme';
import { auth, getUserProfile, UserProfile } from '../services/firebase';
import { useAppSelector } from '../store';
import { themeOptionsMap } from '../store/slices/themeSlice';

interface AnalyticsScreenProps {
  navigation: any;
}

interface WorkoutStats {
  totalWorkouts: number;
  thisWeek: number;
  thisMonth: number;
  averageDuration: number;
  totalTime: number;
  currentStreak: number;
  longestStreak: number;
  favoriteExercise: string;
  totalWeight: number;
  averageWeight: number;
}

const AnalyticsScreen = ({ navigation }: AnalyticsScreenProps) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<WorkoutStats>({
    totalWorkouts: 0,
    thisWeek: 0,
    thisMonth: 0,
    averageDuration: 0,
    totalTime: 0,
    currentStreak: 0,
    longestStreak: 0,
    favoriteExercise: 'Bench Press',
    totalWeight: 0,
    averageWeight: 0,
  });
  const currentThemeId = useAppSelector((state) => state.theme.current);
  const theme = themeOptionsMap[currentThemeId];
  const styles = getStyles(theme);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      if (auth.currentUser) {
        const profile = await getUserProfile(auth.currentUser.uid);
        setUserProfile(profile);
        
        // Calculate stats from user profile
        if (profile) {
          const calculatedStats = calculateStats(profile);
          setStats(calculatedStats);
        }
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (profile: UserProfile): WorkoutStats => {
    // Mock calculations - in real app, these would be calculated from actual workout data
    return {
      totalWorkouts: profile.totalWorkouts || 0,
      thisWeek: Math.floor(Math.random() * 5) + 1,
      thisMonth: Math.floor(Math.random() * 20) + 5,
      averageDuration: Math.floor(Math.random() * 30) + 45,
      totalTime: (profile.totalWorkouts || 0) * 60,
      currentStreak: profile.currentStreak || 0,
      longestStreak: profile.longestStreak || 0,
      favoriteExercise: 'Bench Press',
      totalWeight: (profile.totalWorkouts || 0) * 100,
      averageWeight: 135,
    };
  };

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatWeight = (weight: number): string => {
    return `${weight} lbs`;
  };

  const getProgressPercentage = (current: number, target: number): number => {
    return Math.min((current / target) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return theme.colors.primary;
    if (percentage >= 75) return '#2ECC71';
    if (percentage >= 50) return '#F39C12';
    if (percentage >= 25) return '#E67E22';
    return '#E74C3C';
  };

  const renderStatCard = (title: string, value: string, subtitle: string, icon: string, color?: string) => (
    <LinearGradient
      colors={color ? [color, theme.colors.primary] : theme.gradients.card}
      style={styles.statCard}
    >
      <View style={styles.statHeader}>
        <Text style={styles.statIcon}>{icon}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statSubtitle}>{subtitle}</Text>
    </LinearGradient>
  );

  const renderProgressCard = (title: string, current: number, target: number, unit: string, icon: string) => {
    const percentage = getProgressPercentage(current, target);
    const progressColor = getProgressColor(percentage);
    
    return (
      <LinearGradient
        colors={theme.gradients.card}
        style={styles.progressCard}
      >
        <View style={styles.progressHeader}>
          <Text style={styles.progressIcon}>{icon}</Text>
          <Text style={styles.progressTitle}>{title}</Text>
        </View>
        <Text style={styles.progressValue}>
          {current}/{target} {unit}
        </Text>
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
        <Text style={styles.progressPercentage}>{percentage.toFixed(1)}%</Text>
      </LinearGradient>
    );
  };

  if (loading) {
    return (
      <LinearGradient colors={theme.gradients.background} style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading your analytics...</Text>
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
          <Text style={styles.title}>Analytics Dashboard</Text>
          <Text style={styles.subtitle}>Track your gains with data-driven insights!</Text>
        </View>

        {/* Overview Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Overview</Text>
          
          <View style={styles.statsGrid}>
            {renderStatCard(
              'Total Workouts',
              stats.totalWorkouts.toString(),
              'Lifetime workouts completed',
              '💪'
            )}
            {renderStatCard(
              'This Week',
              stats.thisWeek.toString(),
              'Workouts this week',
              '📅',
              '#3498DB'
            )}
            {renderStatCard(
              'This Month',
              stats.thisMonth.toString(),
              'Workouts this month',
              '📈',
              '#2ECC71'
            )}
            {renderStatCard(
              'Current Streak',
              stats.currentStreak.toString(),
              'Days in a row',
              '🔥',
              '#E74C3C'
            )}
          </View>
        </View>

        {/* Progress Tracking */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Progress Goals</Text>
          
          {renderProgressCard(
            'Weekly Goal',
            stats.thisWeek,
            5,
            'workouts',
            '📅'
          )}
          
          {renderProgressCard(
            'Monthly Goal',
            stats.thisMonth,
            20,
            'workouts',
            '📈'
          )}
          
          {renderProgressCard(
            'Streak Goal',
            stats.currentStreak,
            30,
            'days',
            '🔥'
          )}
        </View>

        {/* Time Analytics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⏱️ Time Analytics</Text>
          
          <LinearGradient
            colors={theme.gradients.card}
            style={styles.analyticsCard}
          >
            <Text style={styles.analyticsTitle}>Workout Duration</Text>
            <View style={styles.analyticsRow}>
              <View style={styles.analyticsItem}>
                <Text style={styles.analyticsLabel}>Average</Text>
                <Text style={styles.analyticsValue}>{formatTime(stats.averageDuration)}</Text>
              </View>
              <View style={styles.analyticsItem}>
                <Text style={styles.analyticsLabel}>Total Time</Text>
                <Text style={styles.analyticsValue}>{formatTime(stats.totalTime)}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Performance Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏋️ Performance Metrics</Text>
          
          <LinearGradient
            colors={theme.gradients.card}
            style={styles.analyticsCard}
          >
            <Text style={styles.analyticsTitle}>Weight Tracking</Text>
            <View style={styles.analyticsRow}>
              <View style={styles.analyticsItem}>
                <Text style={styles.analyticsLabel}>Total Weight</Text>
                <Text style={styles.analyticsValue}>{formatWeight(stats.totalWeight)}</Text>
              </View>
              <View style={styles.analyticsItem}>
                <Text style={styles.analyticsLabel}>Average Weight</Text>
                <Text style={styles.analyticsValue}>{formatWeight(stats.averageWeight)}</Text>
              </View>
            </View>
          </LinearGradient>

          <LinearGradient
            colors={theme.gradients.card}
            style={styles.analyticsCard}
          >
            <Text style={styles.analyticsTitle}>Favorite Exercise</Text>
            <Text style={styles.favoriteExercise}>{stats.favoriteExercise}</Text>
            <Text style={styles.favoriteDescription}>
              Your most performed exercise
            </Text>
          </LinearGradient>
        </View>

        {/* Achievements Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Achievement Summary</Text>
          
          <LinearGradient
            colors={theme.gradients.card}
            style={styles.analyticsCard}
          >
            <Text style={styles.analyticsTitle}>Streak Records</Text>
            <View style={styles.analyticsRow}>
              <View style={styles.analyticsItem}>
                <Text style={styles.analyticsLabel}>Current Streak</Text>
                <Text style={styles.analyticsValue}>{stats.currentStreak} days</Text>
              </View>
              <View style={styles.analyticsItem}>
                <Text style={styles.analyticsLabel}>Longest Streak</Text>
                <Text style={styles.analyticsValue}>{stats.longestStreak} days</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Insights</Text>
          
          <LinearGradient
            colors={theme.gradients.cyanGlow}
            style={styles.insightCard}
          >
            <Text style={styles.insightTitle}>💪 Keep It Up!</Text>
            <Text style={styles.insightText}>
              You're on a {stats.currentStreak}-day streak! Consistency is key to gains.
            </Text>
          </LinearGradient>

          <LinearGradient
            colors={theme.gradients.card}
            style={styles.insightCard}
          >
            <Text style={styles.insightTitle}>📈 Progress Tip</Text>
            <Text style={styles.insightText}>
              Try increasing your workout frequency to hit your monthly goal faster.
            </Text>
          </LinearGradient>

          <LinearGradient
            colors={theme.gradients.card}
            style={styles.insightCard}
          >
            <Text style={styles.insightTitle}>🎯 Goal Setting</Text>
            <Text style={styles.insightText}>
              Set specific, measurable goals to track your progress more effectively.
            </Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
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
  section: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.lg,
    ...theme.effects.textGlow,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.glow,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  statIcon: {
    fontSize: 20,
    marginRight: theme.spacing.sm,
  },
  statTitle: {
    fontSize: theme.fontSizes.small,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statValue: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
    ...theme.effects.textGlow,
  },
  statSubtitle: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
  },
  progressCard: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.glow,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  progressIcon: {
    fontSize: 20,
    marginRight: theme.spacing.sm,
  },
  progressTitle: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  progressValue: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
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
  progressPercentage: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  analyticsCard: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.glow,
  },
  analyticsTitle: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  analyticsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  analyticsItem: {
    flex: 1,
    alignItems: 'center',
  },
  analyticsLabel: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  analyticsValue: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  favoriteExercise: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
    ...theme.effects.textGlow,
  },
  favoriteDescription: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  insightCard: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.glow,
  },
  insightTitle: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  insightText: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
});

export default AnalyticsScreen; 