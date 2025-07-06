import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SerializableWorkout, WorkoutSet } from '../../types/serializable';

interface WorkoutState {
  workouts: SerializableWorkout[];
  currentWorkout: SerializableWorkout | null;
  loading: boolean;
  error: string | null;
}

const initialState: WorkoutState = {
  workouts: [],
  currentWorkout: null,
  loading: false,
  error: null,
};

const workoutSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    setWorkouts: (state, action: PayloadAction<SerializableWorkout[]>) => {
      state.workouts = action.payload;
      state.error = null;
    },
    addWorkout: (state, action: PayloadAction<SerializableWorkout>) => {
      state.workouts.unshift(action.payload);
    },
    updateWorkout: (state, action: PayloadAction<SerializableWorkout>) => {
      const index = state.workouts.findIndex(w => w.id === action.payload.id);
      if (index !== -1) {
        state.workouts[index] = action.payload;
      }
    },
    deleteWorkout: (state, action: PayloadAction<string>) => {
      state.workouts = state.workouts.filter(w => w.id !== action.payload);
    },
    setCurrentWorkout: (state, action: PayloadAction<SerializableWorkout | null>) => {
      state.currentWorkout = action.payload;
    },
    addSetToCurrentWorkout: (state, action: PayloadAction<WorkoutSet>) => {
      if (state.currentWorkout) {
        state.currentWorkout.sets.push(action.payload);
      }
    },
    updateSetInCurrentWorkout: (state, action: PayloadAction<{ index: number; set: WorkoutSet }>) => {
      if (state.currentWorkout && action.payload.index >= 0 && action.payload.index < state.currentWorkout.sets.length) {
        state.currentWorkout.sets[action.payload.index] = action.payload.set;
      }
    },
    completeSetInCurrentWorkout: (state, action: PayloadAction<number>) => {
      if (state.currentWorkout && action.payload >= 0 && action.payload < state.currentWorkout.sets.length) {
        state.currentWorkout.sets[action.payload].completed = !state.currentWorkout.sets[action.payload].completed;
      }
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
  setWorkouts, 
  addWorkout, 
  updateWorkout, 
  deleteWorkout, 
  setCurrentWorkout, 
  addSetToCurrentWorkout, 
  updateSetInCurrentWorkout, 
  completeSetInCurrentWorkout, 
  setLoading, 
  setError, 
  clearError 
} = workoutSlice.actions;
export default workoutSlice.reducer; 