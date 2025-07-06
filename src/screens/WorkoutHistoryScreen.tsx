import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../constants/theme';
import { auth, getUserWorkouts } from '../services/firebase';
import { SerializableWorkout } from '../types/serializable';

const { width, height } = Dimensions.get('window');

const WorkoutHistoryScreen = ({ navigation }: any) => {
  const [workouts, setWorkouts] = useState<SerializableWorkout[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [selectedWorkout, setSelectedWorkout] = useState<SerializableWorkout | null>(null);

  useEffect(() => {
    loadWorkoutHistory();
  }, []);

  const loadWorkoutHistory = async () => {
    try {
      setLoading(true);
      if (auth.currentUser) {
        const userWorkouts = await getUserWorkouts(auth.currentUser.uid);
        // Convert to serializable format
        const serializableWorkouts = userWorkouts.map(workout => ({
          ...workout,
          date: workout.date instanceof Date ? workout.date.toISOString() : workout.date,
        }));
        setWorkouts(serializableWorkouts);
      }
    } catch (error) {
      console.error('Error loading workout history:', error);
      // Don't show alert for empty results - that's normal for new users
      if (error.code !== 'failed-precondition' && error.code !== 'unimplemented') {
        Alert.alert('Error', 'Failed to load your gains history, brah!');
      }
    } finally {
      setLoading(false);
    }
  };

  const getHolyQuote = () => {
    const quotes = [
      "In the name of the Pump, the Rep, and the Holy Gains!",
      "Blessed are the swole, for they shall inherit the gym!",
      "The Book of Gains reveals all your mighty deeds!",
      "Every workout is a prayer to the iron gods!",
      "Your gains are written in the sacred scrolls!",
      "The weights have spoken, and they say you're getting stronger!",
      "Hallelujah! Another day of gains!",
      "The temple of iron has witnessed your transformation!"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const formatWorkoutDate = (date: string | Date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateTotalWeight = (sets: any[]) => {
    return sets.reduce((total, set) => total + (set.weight * set.reps), 0);
  };

  const getWorkoutAchievement = (workout: SerializableWorkout) => {
    const totalWeight = calculateTotalWeight(workout.sets);
    const duration = workout.duration || 0;
    
    if (totalWeight > 10000) return { title: "Iron God", icon: "👑", color: "#FFD700" };
    if (totalWeight > 5000) return { title: "Gainz Master", icon: "💪", color: "#FF6B6B" };
    if (duration > 120) return { title: "Endurance Beast", icon: "🏃", color: "#4ECDC4" };
    if (workout.sets.length > 20) return { title: "Volume King", icon: "📈", color: "#45B7D1" };
    return { title: "Gainz Seeker", icon: "🎯", color: "#96CEB4" };
  };

  const renderWorkoutCard = (workout: SerializableWorkout, index: number) => {
    const achievement = getWorkoutAchievement(workout);
    const totalWeight = calculateTotalWeight(workout.sets);
    const completedSets = workout.sets.filter(set => set.completed).length;

    return (
      <TouchableOpacity
        key={workout.id || index}
        onPress={() => setSelectedWorkout(workout)}
      >
        <LinearGradient
          colors={theme.gradients.card}
          style={styles.workoutCard}
        >
          <View style={styles.workoutHeader}>
            <Text style={styles.workoutName}>{workout.name}</Text>
            <Text style={styles.workoutDate}>{formatWorkoutDate(workout.date)}</Text>
          </View>

          <View style={styles.workoutStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{workout.sets.length}</Text>
              <Text style={styles.statLabel}>Sets</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{completedSets}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{workout.duration || 0}</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalWeight}</Text>
              <Text style={styles.statLabel}>Total Weight</Text>
            </View>
          </View>

          <View style={styles.achievementContainer}>
            <Text style={[styles.achievementIcon, { color: achievement.color }]}>
              {achievement.icon}
            </Text>
            <Text style={styles.achievementTitle}>{achievement.title}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderWorkoutDetail = () => {
    if (!selectedWorkout) return null;

    const totalWeight = calculateTotalWeight(selectedWorkout.sets);
    const completedSets = selectedWorkout.sets.filter(set => set.completed).length;

    return (
      <View style={styles.detailOverlay}>
        <LinearGradient
          colors={theme.gradients.card}
          style={styles.detailCard}
        >
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setSelectedWorkout(null)}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          
          <Text style={styles.detailTitle}>{selectedWorkout.name}</Text>
          <Text style={styles.detailDate}>{formatWorkoutDate(selectedWorkout.date)}</Text>
          
          <View style={styles.detailStats}>
            <View style={styles.detailStat}>
              <Text style={styles.detailStatNumber}>{selectedWorkout.sets.length}</Text>
              <Text style={styles.detailStatLabel}>Total Sets</Text>
            </View>
            <View style={styles.detailStat}>
              <Text style={styles.detailStatNumber}>{completedSets}</Text>
              <Text style={styles.detailStatLabel}>Completed</Text>
            </View>
            <View style={styles.detailStat}>
              <Text style={styles.detailStatNumber}>{selectedWorkout.duration || 0}</Text>
              <Text style={styles.detailStatLabel}>Minutes</Text>
            </View>
            <View style={styles.detailStat}>
              <Text style={styles.detailStatNumber}>{totalWeight}</Text>
              <Text style={styles.detailStatLabel}>Total Weight</Text>
            </View>
          </View>

          <Text style={styles.setsTitle}>Your Sets:</Text>
          <ScrollView style={styles.setsList}>
            {selectedWorkout.sets.map((set, index) => (
              <LinearGradient
                key={index}
                colors={set.completed ? theme.gradients.greenGlow : theme.gradients.card}
                style={styles.setItem}
              >
                <Text style={styles.setExercise}>{set.exerciseName}</Text>
                <Text style={styles.setDetails}>
                  {set.weight} lbs × {set.reps} reps = {set.weight * set.reps} lbs
                </Text>
                <Text style={styles.setStatus}>
                  {set.completed ? '✓ Completed' : 'Not completed'}
                </Text>
              </LinearGradient>
            ))}
          </ScrollView>
        </LinearGradient>
      </View>
    );
  };

  // Full-screen holy image loading experience
  if (imageLoading) {
    return (
      <View style={styles.fullScreenContainer}>
        <Image 
          source={require('../assets/book-of-gains.png')}
          style={styles.fullScreenImage}
          resizeMode="cover"
          onLoad={() => {
            setTimeout(() => setImageLoading(false), 2000); // Show image for 2 seconds
          }}
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.loadingTitle}>The Book of Gains</Text>
          <Text style={styles.loadingSubtitle}>Loading the sacred scrolls...</Text>
          <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loadingSpinner} />
        </View>
      </View>
    );
  }

  // Main content after image loading
  return (
    <LinearGradient
      colors={theme.gradients.background}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Image 
            source={require('../assets/book-of-gains.png')}
            style={styles.holyImage}
            resizeMode="contain"
          />
          <Text style={styles.title}>The Book of Gains</Text>
          <Text style={styles.subtitle}>{getHolyQuote()}</Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Loading the sacred scrolls...</Text>
          </View>
        ) : workouts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <LinearGradient
              colors={theme.gradients.card}
              style={styles.emptyCard}
            >
              <Text style={styles.emptyTitle}>No Gains Yet, Brah!</Text>
              <Text style={styles.emptyDescription}>
                Your Book of Gains is empty. Time to start writing your story of strength!
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('WorkoutTracker')}
              >
                <LinearGradient
                  colors={theme.gradients.cyanGlow}
                  style={styles.startWorkoutButton}
                >
                  <Text style={styles.startWorkoutButtonText}>Start Your First Workout</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ) : (
          <View style={styles.workoutsContainer}>
            <Text style={styles.sectionTitle}>Your Sacred Workouts ({workouts.length})</Text>
            {workouts.map((workout, index) => renderWorkoutCard(workout, index))}
          </View>
        )}
      </ScrollView>

      {renderWorkoutDetail()}
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
    alignItems: 'center',
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  holyImage: {
    width: 120,
    height: 120,
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
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
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.primary,
    marginTop: theme.spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  emptyCard: {
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    ...theme.shadows.glow,
  },
  emptyTitle: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
    ...theme.effects.textGlow,
  },
  emptyDescription: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  startWorkoutButton: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.neon,
  },
  startWorkoutButtonText: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.background,
    textAlign: 'center',
  },
  workoutsContainer: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.lg,
    ...theme.effects.textGlow,
  },
  workoutCard: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.glow,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  workoutName: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  workoutDate: {
    fontSize: theme.fontSizes.caption,
    color: theme.colors.textSecondary,
  },
  workoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.primary,
    ...theme.effects.textGlow,
  },
  statLabel: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  achievementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  achievementIcon: {
    fontSize: theme.fontSizes.heading,
    marginRight: theme.spacing.sm,
  },
  achievementTitle: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  detailOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  detailCard: {
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    width: '100%',
    maxHeight: '80%',
    ...theme.shadows.strongNeon,
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  detailTitle: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
    ...theme.effects.textGlow,
  },
  detailDate: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  detailStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  detailStat: {
    alignItems: 'center',
    flex: 1,
  },
  detailStatNumber: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.primary,
    ...theme.effects.textGlow,
  },
  detailStatLabel: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  setsTitle: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
    ...theme.effects.textGlow,
  },
  setsList: {
    flex: 1,
  },
  setItem: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.glow,
  },
  setExercise: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  setDetails: {
    fontSize: theme.fontSizes.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  setStatus: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.secondary,
    marginTop: theme.spacing.xs,
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  fullScreenImage: {
    width: width,
    height: height,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  loadingTitle: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
    ...theme.effects.textGlow,
  },
  loadingSubtitle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: theme.spacing.lg,
  },
  loadingSpinner: {
    marginTop: theme.spacing.md,
  },
});

export default WorkoutHistoryScreen; 