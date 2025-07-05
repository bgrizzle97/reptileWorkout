import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../constants/theme';
import { useFirebase } from '../hooks/useFirebase';
import { useAppSelector } from '../store';
import { WorkoutSet } from '../services/firebase';

interface Workout {
  id: string;
  date: Date;
  name: string;
  sets: WorkoutSet[];
  completed: boolean;
  duration?: number; // in minutes
}

const WorkoutTrackerScreen = () => {
  const { saveWorkoutData, user } = useFirebase();
  const { currentWorkout } = useAppSelector((state: any) => state.workouts);
  
  const [workoutName, setWorkoutName] = useState('');
  const [selectedExercise, setSelectedExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');

  // Sample exercises for quick selection
  const quickExercises = [
    { id: '1', name: 'Bench Press', category: 'Chest' },
    { id: '2', name: 'Squats', category: 'Legs' },
    { id: '3', name: 'Deadlift', category: 'Back' },
    { id: '4', name: 'Pull-ups', category: 'Back' },
    { id: '5', name: 'Overhead Press', category: 'Shoulders' },
  ];

  const startWorkout = () => {
    if (!workoutName.trim()) {
      Alert.alert('Error', 'Please enter a workout name');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'Please log in to start a workout');
      return;
    }

    const newWorkout = {
      name: workoutName,
      date: new Date(),
      sets: [],
      completed: false,
    };

    // For now, we'll just show the workout form
    // In a real app, you'd save this to Redux state
    setWorkoutName('');
  };

  const addSet = () => {
    if (!selectedExercise || !weight || !reps) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const exercise = quickExercises.find(ex => ex.id === selectedExercise);
    if (!exercise) return;

    const newSet: WorkoutSet = {
      exerciseId: selectedExercise,
      exerciseName: exercise.name,
      weight: parseFloat(weight),
      reps: parseInt(reps),
      completed: false,
    };

    // For now, we'll just show the set
    // In a real app, you'd add this to the current workout
    setSelectedExercise('');
    setWeight('');
    setReps('');
  };

  const finishWorkout = async () => {
    if (!user) {
      Alert.alert('Error', 'Please log in to save your workout');
      return;
    }

    // This would be the actual workout data from state
    const workoutData = {
      name: 'Sample Workout',
      date: new Date(),
      sets: [
        {
          exerciseId: '1',
          exerciseName: 'Bench Press',
          weight: 135,
          reps: 10,
          completed: true,
        },
      ],
      completed: true,
    };

    try {
      const workoutId = await saveWorkoutData(workoutData);
      if (workoutId) {
        Alert.alert(
          'Workout Complete!',
          'Great job! Your workout has been saved. The gains are real!',
          [{ text: 'OK' }]
        );
      }
    } catch (error: any) {
      Alert.alert('Error', 'Failed to save workout. Please try again.');
    }
  };

  const renderCurrentWorkout = () => {
    if (!currentWorkout) return null;

    return (
      <LinearGradient
        colors={theme.gradients.card}
        style={styles.workoutCard}
      >
        <View style={styles.workoutHeader}>
          <Text style={styles.workoutTitle}>{currentWorkout.name}</Text>
          <Text style={styles.workoutDate}>
            {currentWorkout.date.toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.setsContainer}>
          <Text style={styles.setsTitle}>Sets ({currentWorkout.sets.length})</Text>
          {currentWorkout.sets.map((set: any, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => {/* Toggle set completion */}}
            >
              <LinearGradient
                colors={set.completed ? theme.gradients.greenGlow : theme.gradients.card}
                style={styles.setItem}
              >
                <Text style={styles.setExercise}>{set.exerciseName}</Text>
                <Text style={styles.setDetails}>
                  {set.weight} lbs × {set.reps} reps
                </Text>
                <Text style={styles.setStatus}>
                  {set.completed ? '✓ Completed' : 'Tap to complete'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.workoutActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={finishWorkout}
          >
            <LinearGradient
              colors={theme.gradients.cyanGlow}
              style={styles.finishButton}
            >
              <Text style={styles.finishButtonText}>Finish Workout</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  };

  const renderAddSetForm = () => {
    if (!currentWorkout) return null;

    return (
      <LinearGradient
        colors={theme.gradients.card}
        style={styles.addSetForm}
      >
        <Text style={styles.formTitle}>Add Set</Text>
        
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Exercise:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {quickExercises.map(exercise => (
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

        <View style={styles.formRow}>
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
          <LinearGradient
            colors={theme.gradients.greenGlow}
            style={styles.addSetButton}
          >
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
  formRow: {
    marginBottom: theme.spacing.lg,
  },
  formLabel: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
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
});

export default WorkoutTrackerScreen; 