import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../constants/theme';
import { auth, saveWorkout } from '../services/firebase';
import { getExercises } from '../services/exercises';
import { allExercises } from '../data/allExercises';
import { Exercise, WorkoutSet } from '../types';
import { useAppSelector } from '../store';
import { themeOptionsMap } from '../store/slices/themeSlice';
import SocialService from '../services/social';

interface CurrentWorkout {
  name: string;
  startTime: Date;
  sets: WorkoutSet[];
  completed: boolean;
}

const WorkoutTrackerScreen = ({ navigation }: any) => {
  const [workoutName, setWorkoutName] = useState('');
  const [currentWorkout, setCurrentWorkout] = useState<CurrentWorkout | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [workoutDuration, setWorkoutDuration] = useState(0);

  const currentThemeId = useAppSelector((state) => state.theme.current);
  const theme = themeOptionsMap[currentThemeId];
  const styles = getStyles(theme);

  useEffect(() => {
    loadExercises();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentWorkout && !currentWorkout.completed) {
      interval = setInterval(() => {
        const duration = Math.floor((Date.now() - currentWorkout.startTime.getTime()) / 1000 / 60);
        setWorkoutDuration(duration);
      }, 60000); // Update every minute
    }
    return () => clearInterval(interval);
  }, [currentWorkout]);

  const loadExercises = async () => {
    try {
      // For now, use the all exercises data
      // In a real app, you'd fetch from Firebase
      const exercisesData = allExercises;
      setExercises(exercisesData);
    } catch (error) {
      console.error('Error loading exercises:', error);
    }
  };

  const getMotivationalQuote = () => {
    const quotes = [
      "Time to feed the pump!",
      "The weights are getting lonely, brah!",
      "Every rep is a step closer to greatness!",
      "Your future self is watching you right now!",
      "The only bad workout is the one that didn't happen!",
      "Gains don't happen by accident!",
      "The mirror is your biggest critic and your biggest fan!",
      "Leg day is not optional, it's mandatory!"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const startWorkout = () => {
    if (!workoutName.trim()) {
      Alert.alert('Bro, what are you doing?', 'Enter a workout name, you absolute unit!');
      return;
    }

    if (!auth.currentUser) {
      Alert.alert('Authentication Error', 'Please log in to start a workout, brah!');
      return;
    }

    const newWorkout: CurrentWorkout = {
      name: workoutName,
      startTime: new Date(),
      sets: [],
      completed: false,
    };

    setCurrentWorkout(newWorkout);
    setWorkoutName('');
    Alert.alert('Workout Started!', 'Time to get absolutely peeled! 💪');
  };

  const addSet = () => {
    if (!selectedExercise || !weight || !reps) {
      Alert.alert('Incomplete Set', 'Fill in all the fields, bro! No half-reps here!');
      return;
    }

    const exercise = exercises.find(ex => ex.id === selectedExercise);
    if (!exercise) return;

    const newSet: WorkoutSet = {
      exerciseId: selectedExercise,
      exerciseName: exercise.name,
      weight: parseFloat(weight),
      reps: parseInt(reps),
      completed: false,
    };

    setCurrentWorkout(prev => prev ? {
      ...prev,
      sets: [...prev.sets, newSet]
    } : null);

    setSelectedExercise('');
    setWeight('');
    setReps('');

    Alert.alert('Set Added!', 'Another step closer to greatness! 🏋️');
  };

  const toggleSetCompletion = (index: number) => {
    if (!currentWorkout) return;

    const updatedSets = [...currentWorkout.sets];
    updatedSets[index].completed = !updatedSets[index].completed;

    setCurrentWorkout({
      ...currentWorkout,
      sets: updatedSets
    });
  };

  const finishWorkout = async () => {
    if (!currentWorkout || !auth.currentUser) {
      Alert.alert('Error', 'No active workout or user not logged in!');
      return;
    }

    if (currentWorkout.sets.length === 0) {
      Alert.alert('Empty Workout', 'Bro, you need to do some sets first! No gains from an empty workout!');
      return;
    }

    setLoading(true);
    try {
      const workoutData = {
        userId: auth.currentUser.uid,
        name: currentWorkout.name,
        date: currentWorkout.startTime,
        sets: currentWorkout.sets,
        completed: true,
        duration: workoutDuration,
        totalWeight: currentWorkout.sets.reduce((sum, set) => sum + (set.weight * set.reps), 0)
      };

      await saveWorkout(workoutData);
      
      Alert.alert(
        'Workout Complete! 🎉',
        `Great job, brah! You just crushed it for ${workoutDuration} minutes and moved ${workoutData.totalWeight} total pounds! The gains are real!`,
        [
          {
            text: 'Share Workout',
            onPress: async () => {
              try {
                await SocialService.shareWorkout(workoutData);
                Alert.alert('Shared!', 'Your workout has been shared with the community! 💪');
              } catch (error) {
                console.error('Error sharing workout:', error);
                Alert.alert('Error', 'Failed to share workout');
              }
            }
          },
          {
            text: 'View Progress',
            onPress: () => navigation.navigate('Profile')
          },
          {
            text: 'Start Another',
            onPress: () => {
              setCurrentWorkout(null);
              setWorkoutDuration(0);
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error saving workout:', error);
      Alert.alert('Error', 'Failed to save workout. Check your connection, brah!');
    } finally {
      setLoading(false);
    }
  };

  const renderWorkoutStats = () => {
    if (!currentWorkout) return null;

    const completedSets = currentWorkout.sets.filter(set => set.completed).length;
    const totalWeight = currentWorkout.sets.reduce((sum, set) => sum + (set.weight * set.reps), 0);

    return (
      <View style={styles.statsContainer}>
        <LinearGradient colors={theme.gradients.card} style={styles.statCard}>
          <Text style={styles.statNumber}>{currentWorkout.sets.length}</Text>
          <Text style={styles.statLabel}>Total Sets</Text>
        </LinearGradient>
        
        <LinearGradient colors={theme.gradients.card} style={styles.statCard}>
          <Text style={styles.statNumber}>{completedSets}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </LinearGradient>
        
        <LinearGradient colors={theme.gradients.card} style={styles.statCard}>
          <Text style={styles.statNumber}>{workoutDuration}</Text>
          <Text style={styles.statLabel}>Minutes</Text>
        </LinearGradient>
        
        <LinearGradient colors={theme.gradients.card} style={styles.statCard}>
          <Text style={styles.statNumber}>{totalWeight}</Text>
          <Text style={styles.statLabel}>Total Weight</Text>
        </LinearGradient>
      </View>
    );
  };

  const renderCurrentWorkout = () => {
    if (!currentWorkout) return null;

    return (
      <View style={styles.workoutContainer}>
        <LinearGradient colors={theme.gradients.card} style={styles.workoutCard}>
          <View style={styles.workoutHeader}>
            <Text style={styles.workoutTitle}>{currentWorkout.name}</Text>
            <Text style={styles.workoutSubtitle}>{getMotivationalQuote()}</Text>
            <Text style={styles.workoutDate}>
              Started at {currentWorkout.startTime.toLocaleTimeString()}
            </Text>
          </View>

          {renderWorkoutStats()}

          <View style={styles.setsContainer}>
            <Text style={styles.setsTitle}>Your Sets ({currentWorkout.sets.length})</Text>
            {currentWorkout.sets.map((set, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleSetCompletion(index)}
              >
                <LinearGradient
                  colors={set.completed ? theme.gradients.greenGlow : theme.gradients.card}
                  style={styles.setItem}
                >
                  <Text style={styles.setExercise}>{set.exerciseName}</Text>
                  <Text style={styles.setDetails}>
                    {set.weight} lbs × {set.reps} reps = {set.weight * set.reps} lbs
                  </Text>
                  <Text style={styles.setStatus}>
                    {set.completed ? '✓ Completed' : 'Tap to complete'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.finishButton}
            onPress={finishWorkout}
            disabled={loading}
          >
            <LinearGradient colors={theme.gradients.cyanGlow} style={styles.finishButtonGradient}>
              {loading ? (
                <ActivityIndicator color={theme.colors.background} />
              ) : (
                <Text style={styles.finishButtonText}>Finish Workout</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };

  const renderAddSetForm = () => {
    if (!currentWorkout) return null;

    return (
      <LinearGradient colors={theme.gradients.card} style={styles.addSetForm}>
        <Text style={styles.formTitle}>Add Set</Text>
        
        <View style={styles.exerciseSelector}>
          <Text style={styles.formLabel}>Choose Exercise:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {exercises.map(exercise => (
              <TouchableOpacity
                key={exercise.id}
                onPress={() => setSelectedExercise(exercise.id)}
              >
                <LinearGradient
                  colors={selectedExercise === exercise.id ? theme.gradients.cyanGlow : theme.gradients.card}
                  style={styles.exerciseButton}
                >
                  <Text style={[
                    styles.exerciseButtonText,
                    selectedExercise === exercise.id && styles.selectedExerciseText
                  ]}>
                    {exercise.name}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.formLabel}>Weight (lbs):</Text>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={theme.colors.textMuted}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.formLabel}>Reps:</Text>
            <TextInput
              style={styles.input}
              value={reps}
              onChangeText={setReps}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={theme.colors.textMuted}
            />
          </View>
        </View>

        <TouchableOpacity onPress={addSet}>
          <LinearGradient colors={theme.gradients.greenGlow} style={styles.addSetButton}>
            <Text style={styles.addSetButtonText}>Add Set</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  return (
    <LinearGradient
      colors={theme.gradients.background}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Workout Tracker</Text>
          <Text style={styles.subtitle}>Log your sets, reps, and weight like a true gym rat</Text>
        </View>

        {!currentWorkout ? (
          <View style={styles.startWorkoutContainer}>
            <LinearGradient
              colors={theme.gradients.card}
              style={styles.startWorkoutCard}
            >
              <Text style={styles.startWorkoutTitle}>Start New Workout</Text>
              <Text style={styles.startWorkoutDescription}>
                Enter a name for your workout and start tracking your gains!
              </Text>
              
              <LinearGradient
                colors={theme.gradients.card}
                style={styles.workoutNameInput}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Workout name..."
                  placeholderTextColor={theme.colors.textMuted}
                  value={workoutName}
                  onChangeText={setWorkoutName}
                />
              </LinearGradient>

              <TouchableOpacity onPress={startWorkout}>
                <LinearGradient
                  colors={theme.gradients.cyanGlow}
                  style={styles.startButton}
                >
                  <Text style={styles.startButtonText}>Start Workout</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ) : (
          <View style={styles.workoutContainer}>
            {renderCurrentWorkout()}
            {renderAddSetForm()}
          </View>
        )}
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
  startWorkoutContainer: {
    padding: theme.spacing.lg,
  },
  startWorkoutCard: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    alignItems: 'center',
    ...theme.shadows.glow,
  },
  startWorkoutTitle: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
    ...theme.effects.textGlow,
  },
  startWorkoutDescription: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  workoutNameInput: {
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg,
    width: '100%',
    ...theme.shadows.glow,
  },
  input: {
    padding: theme.spacing.lg,
    color: theme.colors.text,
    fontSize: theme.fontSizes.body,
  },
  startButton: {
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    width: '100%',
    ...theme.shadows.neon,
  },
  startButtonText: {
    color: theme.colors.background,
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  workoutContainer: {
    padding: theme.spacing.lg,
  },
  workoutCard: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.glow,
  },
  workoutHeader: {
    marginBottom: theme.spacing.lg,
  },
  workoutTitle: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    ...theme.effects.textGlow,
  },
  workoutSubtitle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  workoutDate: {
    fontSize: theme.fontSizes.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  setsContainer: {
    marginBottom: theme.spacing.lg,
  },
  setsTitle: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  setItem: {
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
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
  workoutActions: {
    alignItems: 'center',
  },
  actionButton: {
    width: '100%',
  },
  finishButton: {
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    ...theme.shadows.neon,
  },
  finishButtonGradient: {
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    ...theme.shadows.neon,
  },
  finishButtonText: {
    color: theme.colors.background,
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addSetForm: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.glow,
  },
  formTitle: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.lg,
    ...theme.effects.textGlow,
  },
  formLabel: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  exerciseSelector: {
    marginBottom: theme.spacing.lg,
  },
  inputRow: {
    marginBottom: theme.spacing.lg,
  },
  inputContainer: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  addSetButton: {
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    ...theme.shadows.glow,
  },
  addSetButtonText: {
    color: theme.colors.background,
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  statCard: {
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    flex: 1,
    ...theme.shadows.glow,
  },
  statNumber: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  statLabel: {
    fontSize: theme.fontSizes.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  exerciseButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.sm,
    ...theme.shadows.glow,
  },
  exerciseButtonText: {
    fontSize: theme.fontSizes.caption,
    color: theme.colors.text,
  },
  selectedExerciseText: {
    color: theme.colors.background,
    fontWeight: 'bold',
  },
});

export default WorkoutTrackerScreen; 