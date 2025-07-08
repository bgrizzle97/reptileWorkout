import { useState, useMemo } from 'react';
import { Exercise } from '../types';

export interface ExerciseFilters {
  equipmentType?: string;
  muscleGroup?: string;
  searchQuery?: string;
  difficulty?: string;
}

export const useExerciseFilters = (exercises: Exercise[]) => {
  const [filters, setFilters] = useState<ExerciseFilters>({
    equipmentType: 'all',
    muscleGroup: '',
    searchQuery: '',
    difficulty: '',
  });

  const filteredExercises = useMemo(() => {
    let filtered = exercises;

    // Filter by equipment type
    if (filters.equipmentType && filters.equipmentType !== 'all') {
      filtered = filtered.filter(exercise => exercise.equipmentType === filters.equipmentType);
    }

    // Filter by muscle group
    if (filters.muscleGroup) {
      filtered = filtered.filter(exercise =>
        exercise.muscleGroups.some(group =>
          group.toLowerCase().includes(filters.muscleGroup!.toLowerCase())
        )
      );
    }

    // Filter by search query
    if (filters.searchQuery) {
      filtered = filtered.filter(exercise =>
        exercise.name.toLowerCase().includes(filters.searchQuery!.toLowerCase()) ||
        exercise.category.toLowerCase().includes(filters.searchQuery!.toLowerCase()) ||
        exercise.muscleGroups.some(group =>
          group.toLowerCase().includes(filters.searchQuery!.toLowerCase())
        )
      );
    }

    // Filter by difficulty
    if (filters.difficulty) {
      filtered = filtered.filter(exercise => exercise.difficulty === filters.difficulty);
    }

    return filtered;
  }, [exercises, filters]);

  const updateFilter = (key: keyof ExerciseFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      equipmentType: 'all',
      muscleGroup: '',
      searchQuery: '',
      difficulty: '',
    });
  };

  const getEquipmentTypes = () => {
    const types = new Set(exercises.map(ex => ex.equipmentType));
    return Array.from(types).sort();
  };

  const getMuscleGroups = () => {
    const groups = new Set<string>();
    exercises.forEach(ex => {
      ex.muscleGroups.forEach(group => groups.add(group));
    });
    return Array.from(groups).sort();
  };

  const getDifficulties = () => {
    const difficulties = new Set(exercises.map(ex => ex.difficulty));
    return Array.from(difficulties).sort();
  };

  return {
    filters,
    filteredExercises,
    updateFilter,
    clearFilters,
    getEquipmentTypes,
    getMuscleGroups,
    getDifficulties,
  };
}; 