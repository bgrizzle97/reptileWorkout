import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Exercise } from '../../types';
import { getExercises, getExercisesByCategory, getExercisesByEquipmentType } from '../../services/exercises';
import { allExercises } from '../../data/allExercises';

interface ExerciseState {
  exercises: Exercise[];
  loading: boolean;
  error: string | null;
  selectedExercise: Exercise | null;
  filteredExercises: Exercise[];
  selectedCategory: string;
  selectedEquipmentType: string;
}

const initialState: ExerciseState = {
  exercises: [],
  loading: false,
  error: null,
  selectedExercise: null,
  filteredExercises: [],
  selectedCategory: 'All',
  selectedEquipmentType: 'All'
};

export const loadExercises = createAsyncThunk(
  'exercises/loadExercises',
  async () => {
    // For now, return the local exercises data
    // In a real app, you'd fetch from Firebase
    return allExercises;
  }
);

const exerciseSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    setExercises: (state, action: PayloadAction<Exercise[]>) => {
      state.exercises = action.payload;
      state.error = null;
    },
    addExercise: (state, action: PayloadAction<Exercise>) => {
      state.exercises.push(action.payload);
    },
    updateExercise: (state, action: PayloadAction<Exercise>) => {
      const index = state.exercises.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.exercises[index] = action.payload;
      }
    },
    deleteExercise: (state, action: PayloadAction<string>) => {
      state.exercises = state.exercises.filter(e => e.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { 
  setExercises, 
  addExercise, 
  updateExercise, 
  deleteExercise, 
  setLoading, 
  setError, 
  clearError 
} = exerciseSlice.actions;
export default exerciseSlice.reducer; 