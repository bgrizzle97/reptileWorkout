import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAppDispatch, useAppSelector } from '../store';
import { setTheme, themeOptionsMap, ThemeId } from '../store/slices/themeSlice';
import { theme as baseTheme } from '../constants/theme';

interface PersonalizationScreenProps {
  navigation: any;
}

const PersonalizationScreen = ({ navigation }: PersonalizationScreenProps) => {
  const dispatch = useAppDispatch();
  const selectedTheme = useAppSelector((state) => state.theme.current);
  const theme = themeOptionsMap[selectedTheme] || baseTheme;
  const themeOptionsTyped: Record<ThemeId, typeof baseTheme & { name: string; description: string }> = themeOptionsMap as any;
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [achievementAlerts, setAchievementAlerts] = useState(true);

  const styles = getStyles(theme as any);

  const handleThemeSelect = (themeId: string) => {
    dispatch(setTheme(themeId as ThemeId));
    // No need for Alert, UI will update immediately
  };

  const handleDarkModeToggle = (value: boolean) => {
    setDarkMode(value);
    Alert.alert(
      'Dark Mode',
      value ? 'Dark mode enabled!' : 'Dark mode disabled!',
      [{ text: 'OK' }]
    );
  };

  const handleNotificationToggle = (value: boolean) => {
    setNotifications(value);
  };

  const handleAchievementToggle = (value: boolean) => {
    setAchievementAlerts(value);
  };

  const renderThemeOption = (themeOption: { id: string; name: string; description: string; colors: { primary: string; secondary: string; accent: string }; gradient: string[]; }) => {
    const isSelected = selectedTheme === themeOption.id;
    const themeObj = themeOptionsTyped[themeOption.id as ThemeId];
    return (
      <TouchableOpacity
        key={themeOption.id}
        onPress={() => handleThemeSelect(themeOption.id)}
        style={styles.themeOption}
      >
        <LinearGradient
          colors={isSelected ? themeObj.gradients.accent : themeObj.gradients.background}
          style={[styles.themeCard, isSelected && styles.selectedTheme]}
        >
          <View style={styles.themePreviewRow}>
            <LinearGradient
              colors={themeObj.gradients.background}
              style={styles.themePreviewGradient}
            >
              <View style={[styles.colorSwatch, { backgroundColor: themeObj.colors.primary }]} />
              <View style={[styles.colorSwatch, { backgroundColor: themeObj.colors.secondary }]} />
              <View style={[styles.colorSwatch, { backgroundColor: themeObj.colors.accent }]} />
            </LinearGradient>
          </View>
          <View style={styles.themeInfo}>
            <Text style={[styles.themeName, isSelected && styles.selectedText]}>
              {themeOption.name}
            </Text>
            <Text style={[styles.themeDescription, isSelected && styles.selectedText]}>
              {themeOption.description}
            </Text>
          </View>
          {isSelected && (
            <Text style={styles.selectedBadge}>  </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  };

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
            <Text style={styles.backButtonText}>  Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Personalization</Text>
          <Text style={styles.subtitle}>Make the app your own, brah!</Text>
        </View>

        {/* Theme Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>  Choose Your Theme</Text>
          <Text style={styles.sectionDescription}>
            Pick a theme that matches your vibe and workout style
          </Text>
          {Object.entries(themeOptionsTyped).map(([id, theme]) => renderThemeOption({
            id,
            name: theme.name,
            description: theme.description,
            colors: theme.colors,
            gradient: theme.gradients.background,
          }))}
        </View>

        {/* Display Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>  Display Settings</Text>
          
          <LinearGradient
            colors={theme.gradients.card}
            style={styles.settingCard}
          >
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Dark Mode</Text>
                <Text style={styles.settingDescription}>
                  Switch to dark theme for better visibility
                </Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={handleDarkModeToggle}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={darkMode ? theme.colors.secondary : '#f4f3f4'}
              />
            </View>
          </LinearGradient>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>  Notifications</Text>
          
          <LinearGradient
            colors={theme.gradients.card}
            style={styles.settingCard}
          >
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Workout Reminders</Text>
                <Text style={styles.settingDescription}>
                  Get notified about your scheduled workouts
                </Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={handleNotificationToggle}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={notifications ? theme.colors.secondary : '#f4f3f4'}
              />
            </View>
          </LinearGradient>

          <LinearGradient
            colors={theme.gradients.card}
            style={styles.settingCard}
          >
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Achievement Alerts</Text>
                <Text style={styles.settingDescription}>
                  Celebrate when you unlock new achievements
                </Text>
              </View>
              <Switch
                value={achievementAlerts}
                onValueChange={handleAchievementToggle}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={achievementAlerts ? theme.colors.secondary : '#f4f3f4'}
              />
            </View>
          </LinearGradient>
        </View>

        {/* Dashboard Customization */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>  Dashboard Widgets</Text>
          <Text style={styles.sectionDescription}>
            Customize what you see on your dashboard
          </Text>
          
          <LinearGradient
            colors={theme.gradients.card}
            style={styles.widgetCard}
          >
            <Text style={styles.widgetTitle}>Quick Actions</Text>
            <Text style={styles.widgetDescription}>
              Show your most used features for faster access
            </Text>
            <TouchableOpacity style={styles.widgetButton}>
              <Text style={styles.widgetButtonText}>Customize</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={theme.gradients.card}
            style={styles.widgetCard}
          >
            <Text style={styles.widgetTitle}>Progress Widgets</Text>
            <Text style={styles.widgetDescription}>
              Choose which stats to display prominently
            </Text>
            <TouchableOpacity style={styles.widgetButton}>
              <Text style={styles.widgetButtonText}>Configure</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Mascot Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🦎 Choose Your Mascot</Text>
          <Text style={styles.sectionDescription}>
            Select your fitness companion (coming soon!)
          </Text>
          
          <LinearGradient
            colors={theme.gradients.card}
            style={styles.mascotCard}
          >
            <Text style={styles.mascotTitle}>Buff Lizard</Text>
            <Text style={styles.mascotDescription}>
              The original swole companion
            </Text>
            <Text style={styles.comingSoon}>More mascots coming soon!</Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const getStyles = (theme: typeof baseTheme) => StyleSheet.create({
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
  },
  subtitle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.secondary,
    textAlign: 'center',
  },
  section: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  sectionDescription: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  themeOption: {
    marginBottom: theme.spacing.md,
  },
  themeCard: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedTheme: {
  },
  themePreviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  themePreviewGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 4,
    marginRight: 12,
    width: 64,
    height: 32,
    overflow: 'hidden',
  },
  colorSwatch: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 4,
  },
  themeInfo: {
    flex: 1,
  },
  themeName: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  themeDescription: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
  },
  selectedText: {
    color: theme.colors.background,
  },
  selectedBadge: {
    fontSize: 24,
    color: theme.colors.background,
    fontWeight: 'bold',
  },
  settingCard: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  settingTitle: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  settingDescription: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
  },
  widgetCard: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
  },
  widgetTitle: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  widgetDescription: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  widgetButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    alignSelf: 'flex-start',
  },
  widgetButtonText: {
    color: theme.colors.background,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.small,
  },
  mascotCard: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  mascotTitle: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  mascotDescription: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  comingSoon: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.accent,
    fontStyle: 'italic',
  },
});

export default PersonalizationScreen; 