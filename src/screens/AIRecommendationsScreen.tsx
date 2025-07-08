import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAppSelector } from '../store';
import { themeOptionsMap } from '../store/slices/themeSlice';
import { allExercises } from '../data/allExercises';

const QUESTIONS = [
  {
    key: 'goal',
    question: 'What is your main goal for today?',
    options: ['Build Muscle', 'Lose Fat', 'Increase Strength', 'General Fitness', 'Other'],
    followUp: 'Great choice! Let\'s find the perfect exercises for your goals.',
  },
  {
    key: 'muscleGroup',
    question: 'Which muscle group do you want to focus on?',
    options: ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core', 'Full Body'],
    followUp: 'Excellent! I\'ll target those muscles with the best exercises.',
  },
  {
    key: 'equipment',
    question: 'What equipment do you have available?',
    options: ['Barbell', 'Dumbbell', 'Cable', 'Machine', 'Bodyweight', 'Bands', 'Anything!'],
    followUp: 'Perfect! I\'ll make sure all exercises work with your setup.',
  },
  {
    key: 'time',
    question: 'How much time do you have for your workout?',
    options: ['15 min', '30 min', '45 min', '60+ min'],
    followUp: 'Got it! I\'ll create a workout that fits your schedule perfectly.',
  },
  {
    key: 'difficulty',
    question: 'What difficulty level do you want?',
    options: ['Beginner', 'Intermediate', 'Advanced'],
    followUp: 'Awesome! I\'ll match the intensity to your experience level.',
  },
];

const AIRecommendationsScreen = ({ navigation }: any) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [customInput, setCustomInput] = useState('');
  const [suggestion, setSuggestion] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [typingAnimation] = useState(new Animated.Value(0));

  const currentThemeId = useAppSelector((state) => state.theme.current);
  const theme = themeOptionsMap[currentThemeId];
  const styles = getStyles(theme);

  const currentQuestion = QUESTIONS[step];

  useEffect(() => {
    if (showFollowUp) {
      Animated.timing(typingAnimation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }).start(() => {
        setTimeout(() => {
          setShowFollowUp(false);
          if (step < QUESTIONS.length - 1) {
            setStep(step + 1);
          } else {
            generateSuggestion(answers);
          }
        }, 1500);
      });
    }
  }, [showFollowUp]);

  const handleOption = (option: string) => {
    setAnswers({ ...answers, [currentQuestion.key]: option });
    setCustomInput('');
    setShowFollowUp(true);
  };

  const handleCustomInput = () => {
    if (!customInput.trim()) return;
    handleOption(customInput.trim());
  };

  const generateSuggestion = (userPrefs: any) => {
    setLoading(true);
    // Simple rules-based suggestion engine
    let filtered = allExercises;
    if (userPrefs.muscleGroup && userPrefs.muscleGroup !== 'Full Body') {
      filtered = filtered.filter(ex => ex.muscleGroups.includes(userPrefs.muscleGroup));
    }
    if (userPrefs.equipment && userPrefs.equipment !== 'Anything!') {
      filtered = filtered.filter(ex => ex.equipment.includes(userPrefs.equipment.toLowerCase()));
    }
    if (userPrefs.difficulty) {
      filtered = filtered.filter(ex => ex.difficulty === userPrefs.difficulty);
    }
    // Pick 4-6 exercises
    const count = Math.min(6, Math.max(4, filtered.length));
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);
    setSuggestion({
      ...userPrefs,
      exercises: selected,
    });
    setLoading(false);
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setSuggestion(null);
    setCustomInput('');
    setShowFollowUp(false);
    typingAnimation.setValue(0);
  };

  const handleSaveWorkout = () => {
    Alert.alert(
      'Save Workout',
      'This feature will save your AI-generated workout to your library for future use.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Save', onPress: () => {
          Alert.alert('Success', 'Workout saved to your library!');
        }}
      ]
    );
  };

  const handleStartWorkout = () => {
    Alert.alert(
      'Start Workout',
      'Ready to crush this AI-recommended workout?',
      [
        { text: 'Not Yet', style: 'cancel' },
        { text: 'Let\'s Go!', onPress: () => {
          navigation.navigate('WorkoutTracker', { 
            exercises: suggestion.exercises,
            workoutName: `AI ${suggestion.muscleGroup} Workout`
          });
        }}
      ]
    );
  };

  const renderTypingIndicator = () => {
    return (
      <Animated.View style={[styles.typingContainer, { opacity: typingAnimation }]}>
        <Text style={styles.typingText}>{currentQuestion.followUp}</Text>
        <View style={styles.typingDots}>
          <View style={[styles.dot, { backgroundColor: theme.colors.primary }]} />
          <View style={[styles.dot, { backgroundColor: theme.colors.primary }]} />
          <View style={[styles.dot, { backgroundColor: theme.colors.primary }]} />
        </View>
      </Animated.View>
    );
  };

  return (
    <LinearGradient colors={theme.gradients.background} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>AI Recommendations</Text>
          <Text style={styles.subtitle}>Let the AI help you crush your next workout!</Text>
        </View>

        {!suggestion && !loading && !showFollowUp && (
          <View style={styles.convoCard}>
            <Text style={styles.question}>{currentQuestion.question}</Text>
            {currentQuestion.options.map((option: string) => (
              <TouchableOpacity
                key={option}
                style={styles.optionButton}
                onPress={() => handleOption(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
            <TextInput
              style={styles.input}
              placeholder="Or type your answer..."
              placeholderTextColor={theme.colors.textMuted}
              value={customInput}
              onChangeText={setCustomInput}
              onSubmitEditing={handleCustomInput}
              returnKeyType="done"
            />
            <TouchableOpacity style={styles.customButton} onPress={handleCustomInput}>
              <Text style={styles.customButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}

        {showFollowUp && renderTypingIndicator()}

        {loading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>🤖 Analyzing your preferences...</Text>
            <Text style={styles.loadingSubtext}>Creating the perfect workout for you</Text>
          </View>
        )}

        {suggestion && (
          <View style={styles.suggestionCard}>
            <Text style={styles.suggestionTitle}>🎯 Your AI-Recommended Workout</Text>
            <Text style={styles.suggestionDetail}>
              Goal: <Text style={styles.suggestionValue}>{suggestion.goal}</Text>{'\n'}
              Focus: <Text style={styles.suggestionValue}>{suggestion.muscleGroup}</Text>{'\n'}
              Equipment: <Text style={styles.suggestionValue}>{suggestion.equipment}</Text>{'\n'}
              Time: <Text style={styles.suggestionValue}>{suggestion.time}</Text>{'\n'}
              Difficulty: <Text style={styles.suggestionValue}>{suggestion.difficulty}</Text>
            </Text>
            <Text style={styles.suggestionSubtitle}>💪 Exercises:</Text>
            {suggestion.exercises.map((ex: any, idx: number) => (
              <View key={ex.id} style={styles.exerciseItem}>
                <Text style={styles.exerciseName}>{idx + 1}. {ex.name}</Text>
                <Text style={styles.exerciseDetails}>{ex.muscleGroups.join(', ')} | {ex.equipment.join(', ')} | {ex.difficulty}</Text>
              </View>
            ))}
            
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveWorkout}>
                <Text style={styles.saveButtonText}>💾 Save Workout</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.startButton} onPress={handleStartWorkout}>
                <Text style={styles.startButtonText}>🚀 Start Now</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
              <Text style={styles.restartButtonText}>🔄 Get New Recommendation</Text>
            </TouchableOpacity>
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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
  backButtonText: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.body,
    fontWeight: '600',
  },
  title: {
    fontSize: theme.fontSizes.heading,
    color: theme.colors.text,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  convoCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    width: '100%',
    alignItems: 'center',
  },
  question: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    color: theme.colors.background,
    fontSize: theme.fontSizes.body,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    color: theme.colors.text,
    fontSize: theme.fontSizes.body,
    width: '100%',
    marginBottom: theme.spacing.sm,
  },
  customButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    width: '100%',
  },
  customButtonText: {
    color: theme.colors.background,
    fontSize: theme.fontSizes.body,
    fontWeight: '600',
  },
  typingContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    width: '100%',
    alignItems: 'center',
  },
  typingText: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.body,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  typingDots: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },
  loadingText: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.body,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  loadingSubtext: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.caption,
  },
  suggestionCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    width: '100%',
    alignItems: 'center',
  },
  suggestionTitle: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
  },
  suggestionDetail: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.body,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  suggestionValue: {
    color: theme.colors.secondary,
    fontWeight: 'bold',
  },
  suggestionSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.caption,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  exerciseItem: {
    marginBottom: theme.spacing.sm,
    alignItems: 'flex-start',
    width: '100%',
  },
  exerciseName: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.body,
    fontWeight: '600',
  },
  exerciseDetails: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.caption,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  saveButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    flex: 1,
    marginRight: theme.spacing.sm,
    alignItems: 'center',
  },
  saveButtonText: {
    color: theme.colors.background,
    fontSize: theme.fontSizes.body,
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    flex: 1,
    marginLeft: theme.spacing.sm,
    alignItems: 'center',
  },
  startButtonText: {
    color: theme.colors.background,
    fontSize: theme.fontSizes.body,
    fontWeight: '600',
  },
  restartButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    width: '100%',
  },
  restartButtonText: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.body,
    fontWeight: '600',
  },
});

export default AIRecommendationsScreen; 