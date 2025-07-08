import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAppSelector } from '../store';
import { themeOptionsMap } from '../store/slices/themeSlice';
import { auth, getUserProfile, UserProfile } from '../services/firebase';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = ({ navigation }: any) => {
  const nav = useNavigation();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
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
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMotivationalQuote = () => {
    const quotes = [
      "The weights are getting lonely, brah!",
      "Time to feed the pump!",
      "Leg day is not optional, it's mandatory!",
      "Your future self is watching you right now!",
      "The only bad workout is the one that didn't happen!",
      "Gains don't happen by accident!",
      "Every rep is a step closer to greatness!",
      "The mirror is your biggest critic and your biggest fan!"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const getAchievementBadge = () => {
    if (!userProfile) return null;
    
    if (userProfile.totalWorkouts >= 10) {
      return { title: "Gym Rat", icon: "🏋️", color: theme.colors.primary };
    } else if (userProfile.totalWorkouts >= 5) {
      return { title: "Getting Swole", icon: "💪", color: theme.colors.secondary };
    } else if (userProfile.totalWorkouts >= 1) {
      return { title: "Noob Gains", icon: "🎯", color: theme.colors.accent };
    }
    return null;
  };

  const renderQuickActions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsGrid}>
        <TouchableOpacity
          style={styles.quickActionCard}
          onPress={() => navigation.navigate('WorkoutPlanner' as never)}
        >
          <Text style={styles.quickActionIcon}>💪</Text>
          <Text style={styles.quickActionTitle}>Plan Workout</Text>
          <Text style={styles.quickActionSubtitle}>Create your next session</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickActionCard}
          onPress={() => navigation.navigate('ExerciseLibrary' as never)}
        >
          <Text style={styles.quickActionIcon}>📚</Text>
          <Text style={styles.quickActionTitle}>Exercise Library</Text>
          <Text style={styles.quickActionSubtitle}>Browse all exercises</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickActionCard}
          onPress={() => navigation.navigate('Analytics' as never)}
        >
          <Text style={styles.quickActionIcon}>📊</Text>
          <Text style={styles.quickActionTitle}>Analytics</Text>
          <Text style={styles.quickActionSubtitle}>Track your progress</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickActionCard}
          onPress={() => navigation.navigate('Achievements' as never)}
        >
          <Text style={styles.quickActionIcon}>🏆</Text>
          <Text style={styles.quickActionTitle}>Achievements</Text>
          <Text style={styles.quickActionSubtitle}>View your badges</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickActionCard}
          onPress={() => navigation.navigate('Social' as never)}
        >
          <Text style={styles.quickActionIcon}>👥</Text>
          <Text style={styles.quickActionTitle}>Social Feed</Text>
          <Text style={styles.quickActionSubtitle}>Share your gains</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickActionCard}
          onPress={() => navigation.navigate('Friends' as never)}
        >
          <Text style={styles.quickActionIcon}>🤝</Text>
          <Text style={styles.quickActionTitle}>Friends</Text>
          <Text style={styles.quickActionSubtitle}>Connect & compete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEquipmentQuickAccess = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Equipment Quick Access</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.equipmentScroll}
        contentContainerStyle={styles.equipmentScrollContent}
      >
        <TouchableOpacity
          style={styles.equipmentCard}
          onPress={() => navigation.navigate('ExerciseLibrary' as never, { 
            equipmentFilter: 'barbell' 
          } as never)}
        >
          <Text style={styles.equipmentIcon}>🏋️</Text>
          <Text style={styles.equipmentTitle}>Barbell</Text>
          <Text style={styles.equipmentSubtitle}>Compound movements</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.equipmentCard}
          onPress={() => navigation.navigate('ExerciseLibrary' as never, { 
            equipmentFilter: 'dumbbell' 
          } as never)}
        >
          <Text style={styles.equipmentIcon}>💪</Text>
          <Text style={styles.equipmentTitle}>Dumbbell</Text>
          <Text style={styles.equipmentSubtitle}>Unilateral training</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.equipmentCard}
          onPress={() => navigation.navigate('ExerciseLibrary' as never, { 
            equipmentFilter: 'cable' 
          } as never)}
        >
          <Text style={styles.equipmentIcon}>🔗</Text>
          <Text style={styles.equipmentTitle}>Cable</Text>
          <Text style={styles.equipmentSubtitle}>Constant tension</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.equipmentCard}
          onPress={() => navigation.navigate('ExerciseLibrary' as never, { 
            equipmentFilter: 'bodyweight' 
          } as never)}
        >
          <Text style={styles.equipmentIcon}>🚀</Text>
          <Text style={styles.equipmentTitle}>Bodyweight</Text>
          <Text style={styles.equipmentSubtitle}>No equipment needed</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.equipmentCard}
          onPress={() => navigation.navigate('ExerciseLibrary' as never, { 
            equipmentFilter: 'machine' 
          } as never)}
        >
          <Text style={styles.equipmentIcon}>⚙️</Text>
          <Text style={styles.equipmentTitle}>Machine</Text>
          <Text style={styles.equipmentSubtitle}>Guided movements</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  const renderRecentWorkouts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recent Workouts</Text>
      {/* Implementation of renderRecentWorkouts */}
    </View>
  );

  const renderStats = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Stats</Text>
      <View style={styles.statsContainer}>
        <LinearGradient
          colors={theme.gradients.card}
          style={styles.statCard}
        >
          <Text style={styles.statNumber}>{userProfile?.daysSinceLastSkippedLegDay || 0}</Text>
          <Text style={styles.statLabel}>Days Since Last Skipped Leg Day</Text>
        </LinearGradient>
        
        <LinearGradient
          colors={theme.gradients.card}
          style={styles.statCard}
        >
          <Text style={styles.statNumber}>{userProfile?.totalWorkouts || 0}</Text>
          <Text style={styles.statLabel}>Total Workouts</Text>
        </LinearGradient>
        
        <LinearGradient
          colors={theme.gradients.card}
          style={styles.statCard}
        >
          <Text style={styles.statNumber}>{userProfile?.currentStreak || 0}</Text>
          <Text style={styles.statLabel}>Current Streak</Text>
        </LinearGradient>
      </View>
    </View>
  );

  if (loading) {
    return (
      <LinearGradient colors={theme.gradients.background} style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading your gains...</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={theme.gradients.background} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.title}>Dashboard</Text>
            <TouchableOpacity onPress={() => nav.navigate('Notifications' as never)} style={{ marginLeft: 12 }}>
              <Text style={{ fontSize: 24 }}>🔔</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>Welcome to Rep-tile Dysfunction!</Text>
        </View>

        {/* Achievement Badge */}
        {getAchievementBadge() && (
          <View style={styles.achievementContainer}>
            <LinearGradient
              colors={[getAchievementBadge()!.color, theme.colors.primary]}
              style={styles.achievementBadge}
            >
              <Text style={styles.achievementIcon}>{getAchievementBadge()!.icon}</Text>
              <Text style={styles.achievementTitle}>{getAchievementBadge()!.title}</Text>
            </LinearGradient>
          </View>
        )}

        {renderQuickActions()}
        {renderEquipmentQuickAccess()}
        {renderRecentWorkouts()}
        {renderStats()}

        <View style={styles.menuContainer}>
          <LinearGradient
            colors={theme.gradients.card}
            style={styles.menuItem}
          >
            <TouchableOpacity 
              style={styles.menuTouchable}
              onPress={() => navigation.navigate('WorkoutLibrary')}
            >
              <Text style={styles.menuTitle}>Workout Library</Text>
              <Text style={styles.menuSubtitle}>Browse exercises and get swole</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={theme.gradients.card}
            style={styles.menuItem}
          >
            <TouchableOpacity 
              style={styles.menuTouchable}
              onPress={() => navigation.navigate('WorkoutRoutines')}
            >
              <Text style={styles.menuTitle}>Workout Routines</Text>
              <Text style={styles.menuSubtitle}>Pre-made gains plans</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={theme.gradients.cyanGlow}
            style={styles.menuItem}
          >
            <TouchableOpacity 
              style={styles.menuTouchable}
              onPress={() => navigation.navigate('WorkoutTracker')}
            >
              <Text style={[styles.menuTitle, styles.primaryMenuTitle]}>Start Workout</Text>
              <Text style={[styles.menuSubtitle, styles.primaryMenuSubtitle]}>Time to get the pump going</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={theme.gradients.card}
            style={styles.menuItem}
          >
            <TouchableOpacity 
              style={styles.menuTouchable}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={styles.menuTitle}>Profile</Text>
              <Text style={styles.menuSubtitle}>Manage your swole account</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={theme.gradients.card}
            style={styles.menuItem}
          >
            <TouchableOpacity 
              style={styles.menuTouchable}
              onPress={() => navigation.navigate('Social')}
            >
              <Text style={styles.menuTitle}>Social Hub</Text>
              <Text style={styles.menuSubtitle}>Connect with fitness community</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={theme.gradients.card}
            style={styles.menuItem}
          >
            <TouchableOpacity 
              style={styles.menuTouchable}
              onPress={() => navigation.navigate('AIRecommendations')}
            >
              <Text style={styles.menuTitle}>AI Recommendations</Text>
              <Text style={styles.menuSubtitle}>Smart workout suggestions</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={theme.gradients.card}
            style={styles.menuItem}
          >
            <TouchableOpacity 
              style={styles.menuTouchable}
              onPress={() => navigation.navigate('WorkoutHistory')}
            >
              <Text style={styles.menuTitle}>The Book of Gains</Text>
              <Text style={styles.menuSubtitle}>Your sacred workout history</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={theme.gradients.card}
            style={styles.menuItem}
          >
            <TouchableOpacity 
              style={styles.menuTouchable}
              onPress={() => navigation.navigate('Supplements')}
            >
              <Text style={styles.menuTitle}>Supplement Store</Text>
              <Text style={styles.menuSubtitle}>Fuel your gains with Lizaroids</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={theme.gradients.card}
            style={styles.menuItem}
          >
            <TouchableOpacity 
              style={styles.menuTouchable}
              onPress={() => navigation.navigate('SupplementInfo')}
            >
              <Text style={styles.menuTitle}>Supplement Guide</Text>
              <Text style={styles.menuSubtitle}>Learn about gym supplements</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={theme.gradients.card}
            style={styles.menuItem}
          >
            <TouchableOpacity 
              style={styles.menuTouchable}
              onPress={() => navigation.navigate('Achievements')}
            >
              <Text style={styles.menuTitle}>Achievement Hall</Text>
              <Text style={styles.menuSubtitle}>Unlock badges and rewards</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={theme.gradients.card}
            style={styles.menuItem}
          >
            <TouchableOpacity 
              style={styles.menuTouchable}
              onPress={() => navigation.navigate('Personalization')}
            >
              <Text style={styles.menuTitle}>Personalization</Text>
              <Text style={styles.menuSubtitle}>Customize your experience</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={theme.gradients.card}
            style={styles.menuItem}
          >
            <TouchableOpacity 
              style={styles.menuTouchable}
              onPress={() => navigation.navigate('Analytics')}
            >
              <Text style={styles.menuTitle}>Analytics</Text>
              <Text style={styles.menuSubtitle}>Track your progress</Text>
            </TouchableOpacity>
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mascotBorder: {
    borderRadius: theme.borderRadius.round,
    padding: 3,
    marginRight: theme.spacing.md,
    ...theme.shadows.neon,
  },
  mascotImage: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.round,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
    ...theme.effects.textGlow,
  },
  subtitle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.text,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
  },
  statCard: {
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: theme.spacing.xs,
    ...theme.shadows.neon,
  },
  statNumber: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    ...theme.effects.textGlow,
  },
  statLabel: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  menuContainer: {
    padding: theme.spacing.lg,
  },
  menuItem: {
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.glow,
  },
  menuTouchable: {
    padding: theme.spacing.lg,
  },
  menuTitle: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
    ...theme.effects.textGlow,
  },
  menuSubtitle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
  },
  primaryMenuTitle: {
    color: theme.colors.background,
  },
  primaryMenuSubtitle: {
    color: theme.colors.background,
  },
  achievementContainer: {
    padding: theme.spacing.lg,
  },
  achievementBadge: {
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    flexDirection: 'row',
    ...theme.shadows.neon,
  },
  achievementIcon: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: theme.colors.background,
    marginRight: theme.spacing.md,
  },
  achievementTitle: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.background,
  },
  prContainer: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  prGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  prCard: {
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: theme.spacing.xs,
    ...theme.shadows.neon,
  },
  prNumber: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    ...theme.effects.textGlow,
  },
  prLabel: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
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
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginRight: theme.spacing.md,
    minWidth: 120,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  quickActionIcon: {
    fontSize: 32,
    marginBottom: theme.spacing.sm,
  },
  quickActionTitle: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  quickActionSubtitle: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  equipmentScroll: {
    marginTop: theme.spacing.md,
  },
  equipmentScrollContent: {
    paddingRight: theme.spacing.lg,
  },
  equipmentCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginRight: theme.spacing.md,
    minWidth: 120,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  equipmentIcon: {
    fontSize: 32,
    marginBottom: theme.spacing.sm,
  },
  equipmentTitle: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  equipmentSubtitle: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});

export default DashboardScreen; 