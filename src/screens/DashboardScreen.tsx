import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../constants/theme';
import { auth, getUserProfile, UserProfile } from '../services/firebase';

const DashboardScreen = ({ navigation }: any) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

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
    <LinearGradient
      colors={theme.gradients.background}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <LinearGradient
              colors={theme.gradients.cyanGlow}
              style={styles.mascotBorder}
            >
              <Image 
                source={require('../assets/buff-lizard.jpg')}
                style={styles.mascotImage}
                resizeMode="contain"
              />
            </LinearGradient>
            <View style={styles.headerText}>
              <Text style={styles.title}>
                Welcome Back, {userProfile?.displayName || 'Swole Brother'}!
              </Text>
              <Text style={styles.subtitle}>{getMotivationalQuote()}</Text>
            </View>
          </View>
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

        {/* Personal Records Section */}
        {userProfile?.personalRecords && (
          <View style={styles.prContainer}>
            <Text style={styles.sectionTitle}>Personal Records</Text>
            <View style={styles.prGrid}>
              <LinearGradient colors={theme.gradients.card} style={styles.prCard}>
                <Text style={styles.prNumber}>{userProfile.personalRecords.benchPress || 0}</Text>
                <Text style={styles.prLabel}>Bench Press</Text>
              </LinearGradient>
              <LinearGradient colors={theme.gradients.card} style={styles.prCard}>
                <Text style={styles.prNumber}>{userProfile.personalRecords.squat || 0}</Text>
                <Text style={styles.prLabel}>Squat</Text>
              </LinearGradient>
              <LinearGradient colors={theme.gradients.card} style={styles.prCard}>
                <Text style={styles.prNumber}>{userProfile.personalRecords.deadlift || 0}</Text>
                <Text style={styles.prLabel}>Deadlift</Text>
              </LinearGradient>
            </View>
          </View>
        )}

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
              <Text style={styles.menuSubtitle}>Check your gains progress</Text>
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
});

export default DashboardScreen; 