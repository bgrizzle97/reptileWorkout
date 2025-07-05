import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile, Achievement } from '../../services/firebase';

interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile | null>) => {
      state.profile = action.payload;
      state.error = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    updateAchievements: (state, action: PayloadAction<Achievement[]>) => {
      if (state.profile) {
        state.profile.achievements = action.payload;
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
  setProfile, 
  updateProfile, 
  updateAchievements, 
  setLoading, 
  setError, 
  clearError 
} = userSlice.actions;
export default userSlice.reducer; 