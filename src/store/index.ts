import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userSlice from './slices/userSlice';
import workoutSlice from './slices/workoutSlice';
import exerciseSlice from './slices/exerciseSlice';
import authSlice from './slices/authSlice';
import supplementSlice from './slices/supplementSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    workouts: workoutSlice,
    exercises: exerciseSlice,
    auth: authSlice,
    supplements: supplementSlice,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.user', 'payload.createdAt', 'payload.date', 'payload.unlockedAt'],
        // Ignore these paths in state
        ignoredPaths: ['auth.user', 'user.profile.createdAt', 'workouts.workouts.date', 'user.profile.achievements.unlockedAt'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 