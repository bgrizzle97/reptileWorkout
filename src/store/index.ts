import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userSlice from './slices/userSlice';
import workoutSlice from './slices/workoutSlice';
import exerciseSlice from './slices/exerciseSlice';
import authSlice from './slices/authSlice';

// Placeholder reducer
const placeholderReducer = (state = {}, action: any) => state;

export const store = configureStore({
  reducer: {
    user: userSlice,
    workouts: workoutSlice,
    exercises: exerciseSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 