import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useFirebase } from '../hooks/useFirebase';
import { useAppSelector } from '../store';
import { logOut } from '../services/firebase';
import { themeOptionsMap } from '../store/slices/themeSlice';

// Achievement system
interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

const ProfileScreen = ({ navigation }: any) => {
  const { user, profile } = useFirebase();
  const { loading } = useAppSelector((state: any) => state.user);
  const currentThemeId = useAppSelector((state) => state.theme.current);
  const theme = themeOptionsMap[currentThemeId];
  const styles = getStyles(theme);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout? The gains will miss you!',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logOut();
              // Navigation will be handled by auth state listener
            } catch (error: any) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ]
    );
  };

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <LinearGradient
        colors={theme.gradients.card}
        style={styles.statsCard}
      >
        <Text style={styles.statsTitle}>Your Stats</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profile?.totalWorkouts || 0}</Text>
            <Text style={styles.statLabel}>Total Workouts</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profile?.currentStreak || 0}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profile?.daysSinceLastSkippedLegDay || 0}</Text>
            <Text style={styles.statLabel}>Days Since Skipped Leg Day</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{(profile?.totalWeightLifted || 0).toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Weight Lifted (lbs)</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const renderPersonalRecords = () => (
    <View style={styles.prContainer}>
      <LinearGradient
        colors={theme.gradients.card}
        style={styles.prCard}
      >
        <Text style={styles.prTitle}>Personal Records</Text>
        
        <View style={styles.prList}>
          <View style={styles.prItem}>
            <Text style={styles.prExercise}>Bench Press</Text>
            <Text style={styles.prWeight}>{profile?.personalRecords?.benchPress || 0} lbs</Text>
          </View>
          
          <View style={styles.prItem}>
            <Text style={styles.prExercise}>Squat</Text>
            <Text style={styles.prWeight}>{profile?.personalRecords?.squat || 0} lbs</Text>
          </View>
          
          <View style={styles.prItem}>
            <Text style={styles.prExercise}>Deadlift</Text>
            <Text style={styles.prWeight}>{profile?.personalRecords?.deadlift || 0} lbs</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const renderAchievements = () => (
    <View style={styles.achievementsContainer}>
      <LinearGradient
        colors={theme.gradients.card}
        style={styles.achievementsCard}
      >
        <Text style={styles.achievementsTitle}>Achievements</Text>
        
        {profile?.achievements?.map((achievement: any) => (
          <TouchableOpacity key={achievement.id}>
            <LinearGradient
              colors={achievement.unlocked ? theme.gradients.greenGlow : theme.gradients.card}
              style={styles.achievementItem}
            >
              <Text style={styles.achievementIcon}>{achievement.icon}</Text>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
                {achievement.progress !== undefined && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill,
                          { width: `${(achievement.progress / achievement.maxProgress!) * 100}%` }
                        ]} 
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {achievement.progress}/{achievement.maxProgress}
                    </Text>
                  </View>
                )}
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </LinearGradient>
    </View>
  );

  const renderSettings = () => (
    <View style={styles.settingsContainer}>
      <LinearGradient
        colors={theme.gradients.card}
        style={styles.settingsCard}
      >
        <Text style={styles.settingsTitle}>Settings</Text>
        
        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.settingText}>Edit Profile</Text>
          <Text style={styles.settingArrow}>→</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Notification Preferences</Text>
          <Text style={styles.settingArrow}>→</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Export Data</Text>
          <Text style={styles.settingArrow}>→</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={handleLogout}
        >
          <Text style={[styles.settingText, styles.logoutText]}>Logout</Text>
          <Text style={styles.settingArrow}>→</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  if (loading) {
    return (
      <LinearGradient
        colors={theme.gradients.background}
        style={styles.container}
      >
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
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>Check your gains progress and achievements</Text>
        </View>

        {renderStats()}
        {renderPersonalRecords()}
        {renderAchievements()}
        {renderSettings()}
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
  title: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
    ...theme.effects.textGlow,
  },
  subtitle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.text,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.text,
  },
  statsContainer: {
    padding: theme.spacing.lg,
  },
  statsCard: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.glow,
  },
  statsTitle: {
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
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  statNumber: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    ...theme.effects.textGlowGreen,
  },
  statLabel: {
    fontSize: theme.fontSizes.caption,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  prContainer: {
    padding: theme.spacing.lg,
  },
  prCard: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.glow,
  },
  prTitle: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.lg,
    ...theme.effects.textGlow,
  },
  prList: {
    gap: theme.spacing.md,
  },
  prItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  prExercise: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.text,
    fontWeight: '500',
  },
  prWeight: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.secondary,
    fontWeight: 'bold',
  },
  achievementsContainer: {
    padding: theme.spacing.lg,
  },
  achievementsCard: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.glow,
  },
  achievementsTitle: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.lg,
    ...theme.effects.textGlow,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.glow,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: theme.spacing.md,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  achievementDescription: {
    fontSize: theme.fontSizes.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: theme.colors.surface,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.secondary,
  },
  progressText: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textMuted,
  },
  settingsContainer: {
    padding: theme.spacing.lg,
  },
  settingsCard: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.glow,
  },
  settingsTitle: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.lg,
    ...theme.effects.textGlow,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  settingText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.text,
  },
  logoutText: {
    color: theme.colors.warning,
  },
  settingArrow: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textMuted,
  },
});

export default ProfileScreen; 