import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Supplement } from '../../services/firebase';

interface SupplementState {
  supplements: Supplement[];
  loading: boolean;
  error: string | null;
}

const initialState: SupplementState = {
  supplements: [],
  loading: false,
  error: null,
};

const supplementSlice = createSlice({
  name: 'supplements',
  initialState,
  reducers: {
    setSupplements: (state, action: PayloadAction<Supplement[]>) => {
      state.supplements = action.payload;
      state.error = null;
    },
    addSupplement: (state, action: PayloadAction<Supplement>) => {
      state.supplements.push(action.payload);
    },
    updateSupplement: (state, action: PayloadAction<Supplement>) => {
      const index = state.supplements.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.supplements[index] = action.payload;
      }
    },
    deleteSupplement: (state, action: PayloadAction<string>) => {
      state.supplements = state.supplements.filter(s => s.id !== action.payload);
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
  setSupplements, 
  addSupplement, 
  updateSupplement, 
  deleteSupplement, 
  setLoading, 
  setError, 
  clearError 
} = supplementSlice.actions;
export default supplementSlice.reducer; 