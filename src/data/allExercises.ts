import { Exercise } from '../types';
import { chestExercises } from './chestExercises';
import { backExercises } from './backExercises';
import { legExercises } from './legExercises';
import { shoulderExercises } from './shoulderExercises';
import { armExercises } from './armExercises';
import { coreExercises } from './coreExercises';

// Combine all exercises
export const allExercises: Exercise[] = [
  ...chestExercises,
  ...backExercises,
  ...legExercises,
  ...shoulderExercises,
  ...armExercises,
  ...coreExercises,
  // Add more muscle groups here as we create them
];

// Helper function to get exercises by category
export const getExercisesByCategory = (category: string): Exercise[] => {
  return allExercises.filter(exercise => exercise.category === category);
};

// Helper function to get exercises by equipment type
export const getExercisesByEquipment = (equipmentType: string): Exercise[] => {
  return allExercises.filter(exercise => exercise.equipmentType === equipmentType);
};

// Helper function to get exercises by muscle group
export const getExercisesByMuscleGroup = (muscleGroup: string): Exercise[] => {
  return allExercises.filter(exercise => 
    exercise.muscleGroups.some(group => 
      group.toLowerCase().includes(muscleGroup.toLowerCase())
    )
  );
}; 