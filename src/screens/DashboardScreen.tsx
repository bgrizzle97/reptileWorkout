import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../constants/theme';

const DashboardScreen = ({ navigation }: any) => {
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
              <Text style={styles.title}>Welcome Back, Swole Brother!</Text>
              <Text style={styles.subtitle}>Time to crush some weights</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <LinearGradient
            colors={theme.gradients.card}
            style={styles.statCard}
          >
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Days Since Last Skipped Leg Day</Text>
          </LinearGradient>
          
          <LinearGradient
            colors={theme.gradients.card}
            style={styles.statCard}
          >
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Total Workouts</Text>
          </LinearGradient>
          
          <LinearGradient
            colors={theme.gradients.card}
            style={styles.statCard}
          >
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Current Streak</Text>
          </LinearGradient>
        </View>

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
});

export default DashboardScreen; 