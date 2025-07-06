import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../constants/theme';
import { getExercises, Exercise } from '../services/firebase';

const categories = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];

const WorkoutLibraryScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      setLoading(true);
      const exercisesData = await getExercises();
      setExercises(exercisesData);
      setError(null);
    } catch (err) {
      console.error('Error loading exercises:', err);
      setError('Failed to load exercises. Check your connection, brah!');
    } finally {
      setLoading(false);
    }
  };

  const filteredExercises = exercises.filter(exercise => {
    const matchesCategory = selectedCategory === 'All' || exercise.category === selectedCategory;
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderExerciseItem = ({ item }: { item: Exercise }) => (
    <TouchableOpacity onPress={() => setSelectedExercise(item)}>
      <LinearGradient
        colors={theme.gradients.card}
        style={styles.exerciseCard}
      >
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text style={styles.exerciseCategory}>{item.category}</Text>
        <Text style={styles.exerciseDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.exerciseTags}>
          <Text style={styles.tag}>{item.difficulty}</Text>
          <Text style={styles.tag}>{item.equipment[0]}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderExerciseDetail = () => {
    if (!selectedExercise) return null;

    return (
      <View style={styles.detailOverlay}>
        <LinearGradient
          colors={theme.gradients.card}
          style={styles.detailCard}
        >
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setSelectedExercise(null)}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          
          <Text style={styles.detailTitle}>{selectedExercise.name}</Text>
          <Text style={styles.detailCategory}>{selectedExercise.category}</Text>
          
          <Text style={styles.detailDescription}>{selectedExercise.description}</Text>
          
          <Text style={styles.detailSectionTitle}>Instructions:</Text>
          {selectedExercise.instructions.map((instruction, index) => (
            <Text key={index} style={styles.instructionItem}>
              {index + 1}. {instruction}
            </Text>
          ))}
          
          <Text style={styles.detailSectionTitle}>BroScience:</Text>
          <Text style={styles.broScienceText}>{selectedExercise.broScience}</Text>
          
          <View style={styles.detailTags}>
            <Text style={styles.detailTag}>Difficulty: {selectedExercise.difficulty}</Text>
            <Text style={styles.detailTag}>Equipment: {selectedExercise.equipment.join(', ')}</Text>
          </View>
        </LinearGradient>
      </View>
    );
  };

  if (loading) {
    return (
      <LinearGradient colors={theme.gradients.background} style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading the gains...</Text>
        </View>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient colors={theme.gradients.background} style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadExercises}>
            <Text style={styles.retryButtonText}>Try Again, Brah!</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={theme.gradients.background}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Workout Library</Text>
        <Text style={styles.subtitle}>All the exercises you need to get absolutely peeled</Text>
      </View>

      <View style={styles.searchContainer}>
        <LinearGradient
          colors={theme.gradients.card}
          style={styles.searchInput}
        >
          <TextInput
            style={styles.input}
            placeholder="Search exercises..."
            placeholderTextColor={theme.colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </LinearGradient>
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
            >
              <LinearGradient
                colors={selectedCategory === category ? theme.gradients.cyanGlow : theme.gradients.card}
                style={styles.categoryButton}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText
                ]}>
                  {category}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredExercises}
        renderItem={renderExerciseItem}
        keyExtractor={item => item.id}
        style={styles.exerciseList}
        contentContainerStyle={styles.exerciseListContent}
      />

      {renderExerciseDetail()}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
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
  searchContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  searchInput: {
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.glow,
  },
  input: {
    padding: theme.spacing.lg,
    color: theme.colors.text,
    fontSize: theme.fontSizes.body,
  },
  categoriesContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  categoryButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.sm,
    ...theme.shadows.glow,
  },
  categoryText: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.body,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: theme.colors.background,
    fontWeight: 'bold',
  },
  exerciseList: {
    flex: 1,
  },
  exerciseListContent: {
    padding: theme.spacing.lg,
  },
  exerciseCard: {
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.glow,
  },
  exerciseName: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
    ...theme.effects.textGlow,
  },
  exerciseCategory: {
    fontSize: theme.fontSizes.caption,
    color: theme.colors.secondary,
    marginBottom: theme.spacing.xs,
  },
  exerciseDescription: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  exerciseTags: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  tag: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textMuted,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
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
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
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
  detailCategory: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.secondary,
    marginBottom: theme.spacing.md,
  },
  detailDescription: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
    lineHeight: 24,
  },
  detailSectionTitle: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  },
  instructionItem: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
    lineHeight: 20,
  },
  broScienceText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.secondary,
    fontStyle: 'italic',
    marginBottom: theme.spacing.lg,
    lineHeight: 20,
  },
  detailTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  detailTag: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textMuted,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.error,
    marginBottom: theme.spacing.md,
  },
  retryButton: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primary,
  },
  retryButtonText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.background,
    fontWeight: 'bold',
  },
});

export default WorkoutLibraryScreen; 