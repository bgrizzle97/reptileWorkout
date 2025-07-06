import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../constants/theme';

interface PersonalizationScreenProps {
  navigation: any;
}

interface ThemeOption {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  gradient: string[];
}

const PersonalizationScreen = ({ navigation }: PersonalizationScreenProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [notifications, setNotifications] = useState(true);
  const [achievementAlerts, setAchievementAlerts] = useState(true);

  const themeOptions: ThemeOption[] = [
    {
      id: 'default',
      name: 'BroScience Classic',
      description: 'The original neon cyberpunk theme',
      colors: {
        primary: '#00FFFF',
        secondary: '#FF00FF',
        accent: '#FFFF00',
      },
      gradient: ['#0F0F23', '#1A1A2E'],
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      description: 'Easy on the eyes, perfect for night workouts',
      colors: {
        primary: '#4ECDC4',
        secondary: '#45B7AA',
        accent: '#96CEB4',
      },
      gradient: ['#1A1A1A', '#2D2D2D'],
    },
    {
      id: 'sunset',
      name: 'Sunset Gains',
      description: 'Warm orange and purple gradients',
      colors: {
        primary: '#FF6B35',
        secondary: '#F7931E',
        accent: '#FFD23F',
      },
      gradient: ['#2C1810', '#4A1C10'],
    },
    {
      id: 'ocean',
      name: 'Ocean Depths',
      description: 'Cool blue and teal theme',
      colors: {
        primary: '#00B4D8',
        secondary: '#0077B6',
        accent: '#90E0EF',
      },
      gradient: ['#03045E', '#023E8A'],
    },
    {
      id: 'forest',
      name: 'Forest Warrior',
      description: 'Green and earthy tones',
      colors: {
        primary: '#52B788',
        secondary: '#40916C',
        accent: '#95D5B2',
      },
      gradient: ['#081C15', '#1B4332'],
    },
  ];

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    Alert.alert(
      'Theme Applied',
      'Your new theme has been applied! The changes will take effect immediately.',
      [{ text: 'OK' }]
    );
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

  const renderThemeOption = (themeOption: ThemeOption) => {
    const isSelected = selectedTheme === themeOption.id;
    
    return (
      <TouchableOpacity
        key={themeOption.id}
        onPress={() => handleThemeSelect(themeOption.id)}
        style={styles.themeOption}
      >
        <LinearGradient
          colors={isSelected ? theme.gradients.cyanGlow : theme.gradients.card}
          style={[styles.themeCard, isSelected && styles.selectedTheme]}
        >
          <View style={styles.themePreview}>
            <View style={[styles.colorSwatch, { backgroundColor: themeOption.colors.primary }]} />
            <View style={[styles.colorSwatch, { backgroundColor: themeOption.colors.secondary }]} />
            <View style={[styles.colorSwatch, { backgroundColor: themeOption.colors.accent }]} />
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
            <Text style={styles.selectedBadge}>✓</Text>
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
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Personalization</Text>
          <Text style={styles.subtitle}>Make the app your own, brah!</Text>
        </View>

        {/* Theme Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎨 Choose Your Theme</Text>
          <Text style={styles.sectionDescription}>
            Pick a theme that matches your vibe and workout style
          </Text>
          
          {themeOptions.map(renderThemeOption)}
        </View>

        {/* Display Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Display Settings</Text>
          
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
          <Text style={styles.sectionTitle}>🔔 Notifications</Text>
          
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
          <Text style={styles.sectionTitle}>📊 Dashboard Widgets</Text>
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
  section: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
    ...theme.effects.textGlow,
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
    ...theme.shadows.glow,
  },
  selectedTheme: {
    ...theme.shadows.neon,
  },
  themePreview: {
    flexDirection: 'row',
    marginRight: theme.spacing.md,
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
    ...theme.shadows.glow,
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
    ...theme.shadows.glow,
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
    ...theme.shadows.glow,
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