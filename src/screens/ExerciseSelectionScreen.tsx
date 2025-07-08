import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../store';
import { themeOptionsMap } from '../store/slices/themeSlice';
import { Exercise } from '../types';
import { allExercises } from '../data/allExercises';

interface ExerciseSelectionScreenProps {
  route: {
    params: {
      muscleGroup: string;
      onExercisesSelected: (exercises: Exercise[]) => void;
    };
  };
}

const ExerciseSelectionScreen: React.FC<ExerciseSelectionScreenProps> = ({ route }) => {
  const { muscleGroup, onExercisesSelected } = route.params;
  const navigation = useNavigation();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const currentThemeId = useAppSelector((state) => state.theme.current);
  const theme = themeOptionsMap[currentThemeId];
  const styles = getStyles(theme);

  const equipmentTypes = [
    { key: 'all', label: 'All Equipment' },
    { key: 'barbell', label: 'Barbell' },
    { key: 'dumbbell', label: 'Dumbbell' },
    { key: 'cable', label: 'Cable Machine' },
    { key: 'bodyweight', label: 'Bodyweight' },
    { key: 'machine', label: 'Machine' },
    { key: 'other', label: 'Other' },
  ];

  useEffect(() => {
    loadExercises();
  }, []);

  useEffect(() => {
    filterExercises();
  }, [exercises, searchQuery, selectedEquipment]);

  const loadExercises = async () => {
    try {
      setLoading(true);
      // For now, use the all exercises data
      // In a real app, you'd fetch from Firebase based on muscle group
      const exercisesData = allExercises;
      setExercises(exercisesData);
    } catch (error) {
      console.error('Error loading exercises:', error);
      Alert.alert('Error', 'Failed to load exercises');
    } finally {
      setLoading(false);
    }
  };

  const filterExercises = () => {
    let filtered = exercises;

    // Filter by equipment type
    if (selectedEquipment !== 'all') {
      filtered = filtered.filter(exercise => exercise.equipmentType === selectedEquipment);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(exercise =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.muscleGroups.some(group => 
          group.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    setFilteredExercises(filtered);
  };

  const toggleExerciseSelection = (exercise: Exercise) => {
    setSelectedExercises(prev => {
      const isSelected = prev.some(ex => ex.id === exercise.id);
      if (isSelected) {
        return prev.filter(ex => ex.id !== exercise.id);
      } else {
        return [...prev, exercise];
      }
    });
  };

  const handleConfirmSelection = () => {
    if (selectedExercises.length === 0) {
      Alert.alert('No Exercises Selected', 'Please select at least one exercise.');
      return;
    }
    onExercisesSelected(selectedExercises);
    navigation.goBack();
  };

  const renderExerciseItem = ({ item }: { item: Exercise }) => {
    const isSelected = selectedExercises.some(ex => ex.id === item.id);
    
    return (
      <TouchableOpacity
        style={[styles.exerciseItem, isSelected && styles.selectedExercise]}
        onPress={() => toggleExerciseSelection(item)}
      >
        <View style={styles.exerciseHeader}>
          <Text style={[styles.exerciseName, isSelected && styles.selectedText]}>
            {item.name}
          </Text>
          <View style={styles.equipmentTag}>
            <Text style={styles.equipmentText}>
              {item.equipmentType.charAt(0).toUpperCase() + item.equipmentType.slice(1)}
            </Text>
          </View>
        </View>
        
        <Text style={[styles.exerciseCategory, isSelected && styles.selectedText]}>
          {item.category} • {item.difficulty}
        </Text>
        
        <Text style={[styles.exerciseDescription, isSelected && styles.selectedText]}>
          {item.description}
        </Text>
        
        <View style={styles.muscleGroups}>
          {item.muscleGroups.map((group, index) => (
            <View key={index} style={styles.muscleTag}>
              <Text style={styles.muscleText}>{group}</Text>
            </View>
          ))}
        </View>
        
        <Text style={[styles.broScience, isSelected && styles.selectedText]}>
          💪 {item.broScience}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderEquipmentFilter = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.equipmentFilter}
      contentContainerStyle={styles.equipmentFilterContent}
    >
      {equipmentTypes.map((equipment) => (
        <TouchableOpacity
          key={equipment.key}
          style={[
            styles.equipmentFilterButton,
            selectedEquipment === equipment.key && styles.selectedEquipmentFilter
          ]}
          onPress={() => setSelectedEquipment(equipment.key)}
        >
          <Text style={[
            styles.equipmentFilterText,
            selectedEquipment === equipment.key && styles.selectedEquipmentFilterText
          ]}>
            {equipment.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading exercises...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select {muscleGroup} Exercises</Text>
        <Text style={styles.subtitle}>
          Selected: {selectedExercises.length} exercises
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search exercises..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {renderEquipmentFilter()}

      <FlatList
        data={filteredExercises}
        renderItem={renderExerciseItem}
        keyExtractor={(item) => item.id}
        style={styles.exerciseList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No exercises found</Text>
            <Text style={styles.emptySubtext}>
              Try adjusting your search or equipment filter
            </Text>
          </View>
        }
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.confirmButton, selectedExercises.length === 0 && styles.disabledButton]}
          onPress={handleConfirmSelection}
          disabled={selectedExercises.length === 0}
        >
          <Text style={[styles.confirmButtonText, selectedExercises.length === 0 && styles.disabledButtonText]}>
            Confirm Selection ({selectedExercises.length})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  },
  title: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSizes.caption,
    color: theme.colors.text,
    opacity: 0.8,
  },
  searchContainer: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  searchInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.fontSizes.body,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  equipmentFilter: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  equipmentFilterContent: {
    paddingRight: theme.spacing.lg,
  },
  equipmentFilterButton: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectedEquipmentFilter: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  equipmentFilterText: {
    fontSize: theme.fontSizes.caption,
    color: theme.colors.text,
    fontWeight: '500',
  },
  selectedEquipmentFilterText: {
    color: theme.colors.text,
  },
  exerciseList: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  exerciseItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectedExercise: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  exerciseName: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.text,
    flex: 1,
  },
  selectedText: {
    color: theme.colors.text,
  },
  equipmentTag: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  equipmentText: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.text,
    fontWeight: '500',
  },
  exerciseCategory: {
    fontSize: theme.fontSizes.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  exerciseDescription: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
  muscleGroups: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.md,
  },
  muscleTag: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  muscleText: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.text,
    fontWeight: '500',
  },
  broScience: {
    fontSize: theme.fontSizes.caption,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyText: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  emptySubtext: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  footer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  confirmButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: theme.colors.border,
  },
  confirmButtonText: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  disabledButtonText: {
    color: theme.colors.textSecondary,
  },
  loadingText: {
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
});

export default ExerciseSelectionScreen; 