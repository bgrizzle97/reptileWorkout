import { 
  collection, 
  doc, 
  addDoc, 
  query, 
  where, 
  getDocs,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { Exercise } from '../types';
import { allExercises } from '../data/allExercises';

export const saveExercise = async (exercise: Omit<Exercise, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'exercises'), exercise);
    return docRef.id;
  } catch (error: any) {
    console.error('Save exercise error:', error);
    throw error;
  }
};

export const getExercises = async (): Promise<Exercise[]> => {
  try {
    // For now, return the local exercises data
    // In a real app, you'd fetch from Firebase
    return allExercises;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw new Error('Failed to fetch exercises');
  }
};

export const getExercisesByCategory = async (category: string): Promise<Exercise[]> => {
  try {
    if (category === 'All') {
      return allExercises;
    }
    return allExercises.filter(exercise => exercise.category === category);
  } catch (error) {
    console.error('Error fetching exercises by category:', error);
    throw new Error('Failed to fetch exercises by category');
  }
};

export const getExercisesByEquipmentType = async (equipmentType: string): Promise<Exercise[]> => {
  try {
    return allExercises.filter(exercise => exercise.equipmentType === equipmentType);
  } catch (error) {
    console.error('Error fetching exercises by equipment:', error);
    throw new Error('Failed to fetch exercises by equipment');
  }
};

export const getExercisesByMuscleGroup = async (muscleGroup: string): Promise<Exercise[]> => {
  try {
    return allExercises.filter(exercise => 
      exercise.muscleGroups.some(group => 
        group.toLowerCase().includes(muscleGroup.toLowerCase())
      )
    );
  } catch (error) {
    console.error('Error fetching exercises by muscle group:', error);
    throw new Error('Failed to fetch exercises by muscle group');
  }
};

export const getExercisesByDifficulty = async (difficulty: string): Promise<Exercise[]> => {
  try {
    const q = query(
      collection(db, 'exercises'),
      where('difficulty', '==', difficulty)
    );
    
    const querySnapshot = await getDocs(q);
    const exercises: Exercise[] = [];
    
    querySnapshot.forEach((doc) => {
      exercises.push({
        id: doc.id,
        ...doc.data(),
      } as Exercise);
    });
    
    return exercises;
  } catch (error: any) {
    console.error('Get exercises by difficulty error:', error);
    throw error;
  }
};

// Combined filter function
export const getFilteredExercises = async (filters: {
  category?: string;
  equipmentType?: string;
  muscleGroup?: string;
  difficulty?: string;
}): Promise<Exercise[]> => {
  try {
    let exercises = await getExercises();
    
    // Apply filters
    if (filters.category) {
      exercises = exercises.filter(ex => ex.category === filters.category);
    }
    
    if (filters.equipmentType) {
      exercises = exercises.filter(ex => ex.equipmentType === filters.equipmentType);
    }
    
    if (filters.muscleGroup) {
      exercises = exercises.filter(ex => 
        ex.muscleGroups.some(mg => mg.toLowerCase().includes(filters.muscleGroup!.toLowerCase()))
      );
    }
    
    if (filters.difficulty) {
      exercises = exercises.filter(ex => ex.difficulty === filters.difficulty);
    }
    
    return exercises;
  } catch (error: any) {
    console.error('Get filtered exercises error:', error);
    throw error;
  }
};

// Search exercises
export const searchExercises = async (query: string): Promise<Exercise[]> => {
  try {
    const lowercaseQuery = query.toLowerCase();
    return allExercises.filter(exercise => 
      exercise.name.toLowerCase().includes(lowercaseQuery) ||
      exercise.description.toLowerCase().includes(lowercaseQuery) ||
      exercise.category.toLowerCase().includes(lowercaseQuery) ||
      exercise.muscleGroups.some(group => group.toLowerCase().includes(lowercaseQuery))
    );
  } catch (error) {
    console.error('Error searching exercises:', error);
    throw new Error('Failed to search exercises');
  }
};

// Get exercise by ID
export const getExerciseById = async (id: string): Promise<Exercise | null> => {
  try {
    return allExercises.find(exercise => exercise.id === id) || null;
  } catch (error) {
    console.error('Error fetching exercise by ID:', error);
    throw new Error('Failed to fetch exercise');
  }
}; 